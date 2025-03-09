import moment from 'moment';
import DB from '../db/index.js';
import billSchema from '../schema/bill.js';
import billCountSchema from '../schema/billCounts.js';
import { calculateTableEntries, getCurrentFinancialYearFilter } from '../utils/bill.js';
import RestError from '../utils/error.js';
import ProductModel from './product.js';
import SaleModel from './sale.js';

class BillModel {
  static #model;
  static #countModel;

  static async init() {
    this.#model = DB.connection.model('bill', billSchema);
    this.#countModel = DB.connection.model('bill_count', billCountSchema);

    const { label } = getCurrentFinancialYearFilter();
    const res = await this.#countModel.findOne({ fyear: label }).lean();
    if (!res)
      await this.#countModel.create({ fyear: label, count: 0 }) // can be use to offset bill no
  }

  static async getBillList(filter = {}, options = {}) {
    const result = await this.#model.find(filter, '-order', options).populate('buyerId').lean();

    return result;
  }

  static async getBillCount(filter = {}) {
    const result = await this.#model.countDocuments(filter);

    return result;
  }

  static async getFyearBillCount(fyear) {
    const result = await this.#countModel.findOne({ fyear }).lean()

    return result;
  }

  static async updateFyearBillCount(fyear, count) {
    const result = await this.#countModel.findOneAndUpdate({ fyear }, { count })

    return result;
  }

  static async getBillDetail(_id) {
    const result = await this.#model.findById(_id, '-order').populate('buyerId').lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    return result;
  }

  static async getBillOrders(_id) {
    const result = await this.#model.findById(_id, 'order').populate('order.pid').lean();

    for (const o of result.order) {
      const pid = o.pid._id;
      const lots = await ProductModel.getProductLots({ pid }, true);

      o.available = lots.reduce((agg, curr) => agg + curr.quantity, 0);
    }

    return result.order;
  }

  static async createBill(data) {
    console.log(data)
    const result = await this.#model.create(data);

    return result;
  }

  static async updateBill(_id, data) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    const res = await this.#model.findByIdAndUpdate(_id, data, { returnDocument: 'after', lean: true });
    return res;
  }

  static async deleteBill(_id) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    await this.#model.findByIdAndDelete(_id);
    return result;
  }

  static async addBillOrder(_id, order) {
    const bill = await this.#model.findById(_id, 'order').lean();

    if (!bill)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    for (const o of bill.order) {
      if (o.pid.toString() === order.pid.toString()) {
        throw new RestError(400, 'ERR_ORDER_ALREADY_PRESENT', 'product already in bill orders')
      }
    }

    const res = await this.#model.findByIdAndUpdate(_id, { $push: { order } }, { returnDocument: 'after', lean: true });
    return res;
  }

  static async updateBillOrder(_id, order) {
    const bill = await this.#model.findById(_id, 'order').lean();

    if (!bill)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    const { pid, ...body } = order;

    let res;
    for (const k in body) {
      // console.log({ $set: { [`order.$.${k}`]: order[k] } })
      res = await this.#model.updateOne({ _id, "order.pid": pid }, { $set: { [`order.$.${k}`]: order[k] } }, { returnDocument: 'after', lean: true });
    }

    return res
  }

  static async removeBillOrder(_id, pid) {
    const bill = await this.#model.findById(_id, 'order').lean();

    if (!bill)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    const res = await this.#model.findByIdAndUpdate(_id, { $pull: { order: { pid } } }, { returnDocument: 'after', lean: true });
    return res;
  }

  static async markDelivered(_id) {
    const bill = await this.#model.findById(_id, 'order billDate').lean();

    if (!bill)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    const salesAmounts = calculateTableEntries(bill.order, true);
    const saleData = []; // new sale for this bill
    const saleLotData = []; // add sale lots for this bill
    const lotOps = [];// update existing lots with the left qty
    let canDeliver = true;

    for (const amt of salesAmounts) {
      const { pid, quantity } = amt
      const prodLots = await ProductModel.getProductLots({ pid }, true);
      const sortedLots = prodLots.sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt)))
      const available = sortedLots.reduce((agg, curr) => agg + curr.quantity, 0);

      if (available < quantity) {
        canDeliver = false;
        break;
      }

      let required = quantity;
      let curr = 0;
      let cost = 0;
      while (required > 0) {
        const lot = sortedLots[curr];
        const qtyFromCurrLot = Math.min(required, lot.quantity);
        saleLotData.push({ lid: lot._id, quantity: qtyFromCurrLot });
        cost += lot.price * qtyFromCurrLot;

        const left = (lot.quantity - qtyFromCurrLot);
        lotOps.push({ updateOne: { filter: { _id: lot._id }, update: { quantity: left, isDeleted: (left === 0) ? true : false } } })

        required -= qtyFromCurrLot;
        curr++
      }

      saleData.push({ pid, quantity, net: amt.net, cost });
    }

    if (!canDeliver)
      throw new RestError(400, 'ERR_NOT_ENOUGH_STOCK', 'not enough stock');

    const res = await SaleModel.addSale({ billId: _id, sale: saleData, billDate: bill.billDate }, saleLotData);
    await ProductModel.lotBulkOps(lotOps);
    await this.#model.findByIdAndUpdate(_id, { state: 'delivered' });

    return res
  }

  static async markCompleted(_id) {

  }


  // static async complete(_id) {
  //   const result = await this.#model.findById(_id).lean();

  //   if (!result)
  //     throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

  //   if (result.state === 'completed')
  //     throw new RestError(400, 'ERR_ALREADY_COMPLETED', 'bill already completed');

  //   const products = result.products;
  //   const updations = []

  //   for (const prod of products) {
  //     const product = await ProductModel.searchByUid(prod.uid);

  //     if (product.quantity < prod.quantity)
  //       throw new RestError(404, 'ERR_NOT_ENOUGH_PRODUCT', 'not enough product in stock');

  //     updations.push({ _id: product._id, qty: prod.quantity })
  //   }

  //   for (const u of updations) {
  //     await ProductModel.delete(u._id, u.qty);
  //   }

  //   const res = await this.#model.findByIdAndUpdate(_id, { state: 'completed' }, { returnDocument: 'after', lean: true });
  //   return res;
  // }
}

export default BillModel;