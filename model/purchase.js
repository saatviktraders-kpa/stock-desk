import moment from 'moment';
import DB from '../db/index.js';
import purchaseSchema from '../schema/purchase.js';
import RestError from '../utils/error.js';
import ProductModel from './product.js';

class PurchaseModel {
  static #model;

  static async init() {
    this.#model = DB.connection.model('purchase', purchaseSchema);
  }

  static async getPurchaseList(filter = {}, options = {}) {
    const result = await this.#model.find(filter, '-purchase', options).populate('vendorId').lean();

    return result;
  }

  static async getPurchaseCount(filter = {}) {
    const result = await this.#model.countDocuments(filter);

    return result;
  }

  static async getPurchaseDetail(_id) {
    const result = await this.#model.findById(_id, '-purchase').populate('vendorId').lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'purchase not found');

    return result;
  }

  static async getPurchaseOrders(_id) {
    const result = await this.#model.findById(_id, 'purchase').populate('purchase.pid').lean();

    return result.purchase;
  }

  static async createPurchase(data) {
    const result = await this.#model.create(data);

    return result;
  }

  static async updatePurchase(_id, data) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'purchase not found');

    const res = await this.#model.findByIdAndUpdate(_id, data, { returnDocument: 'after', lean: true });
    return res;
  }

  static async deletePurchase(_id) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'purchase not found');

    await this.#model.findByIdAndDelete(_id);
    return result;
  }

  static async addPurchaseOrder(_id, order) {
    const purchase = await this.#model.findById(_id, 'purchase').lean();

    if (!purchase)
      throw new RestError(404, 'ERR_NOT_FOUND', 'purchase not found');

    for (const o of purchase.purchase) {
      if (o.pid.toString() === order.pid.toString()) {
        throw new RestError(400, 'ERR_ORDER_ALREADY_PRESENT', 'product already in purchase orders')
      }
    }

    const res = await this.#model.findByIdAndUpdate(_id, { $push: { purchase: order } }, { returnDocument: 'after', lean: true });
    return res;
  }

  static async updatePurchaseOrder(_id, order) {
    const purchase = await this.#model.findById(_id, 'purchase').lean();

    if (!purchase)
      throw new RestError(404, 'ERR_NOT_FOUND', 'purchase not found');

    const { pid, ...body } = order;

    let res;
    for (const k in body) {
      // console.log({ $set: { [`order.$.${k}`]: order[k] } })
      res = await this.#model.updateOne({ _id, "purchase.pid": pid }, { $set: { [`purchase.$.${k}`]: order[k] } }, { returnDocument: 'after', lean: true });
    }

    return res
  }

  static async removePurchaseOrder(_id, pid) {
    const purchase = await this.#model.findById(_id, 'purchase').lean();

    if (!purchase)
      throw new RestError(404, 'ERR_NOT_FOUND', 'purchase not found');

    const res = await this.#model.findByIdAndUpdate(_id, { $pull: { purchase: { pid } } }, { returnDocument: 'after', lean: true });
    return res;
  }

  static async markCompleted(_id) {
    const purchase = await this.#model.findById(_id, 'purchase purchaseDate').lean();

    if (!purchase)
      throw new RestError(404, 'ERR_NOT_FOUND', 'purchase not found');

    for (const p of purchase.purchase) {
      await ProductModel.addLot({ ...p, purchaseDate: purchase.purchaseDate })
    }
    const res = await this.#model.findByIdAndUpdate(_id, { state: 'completed' }, { returnDocument: 'after', lean: true });
    return res;
  }
}

export default PurchaseModel;