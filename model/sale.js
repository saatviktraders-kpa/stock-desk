import DB from '../db/index.js';
import { saleSchema, saleLotSchema } from '../schema/sale.js';
import RestError from '../utils/error.js';

class SaleModel {
  static #model;
  static #saleLotModel;

  static init() {
    this.#model = DB.connection.model('sale', saleSchema);
    this.#saleLotModel = DB.connection.model('sale_lot', saleLotSchema);
  }

  static async getSaleList(filter = {}) {
    const result = await this.#model.find(filter).populate({ path: 'billId', select: 'billNo buyerId buyer', populate: { path: 'buyerId', select: 'name' } }).lean();

    return result;
  }

  static async getSaleListShort(filter = {}) {
    const result = await this.#model.find(filter, 'sale').lean();

    return result;
  }

  static async getSale(billId) {
    const result = await this.#model.findOne({ billId });

    return result;
  }

  static async addSale(data, saleLots) {
    const result = await this.#model.create(data);

    await this.addSaleLots(saleLots.map(s => ({ ...s, saleId: result._id })))

    return result;
  }

  static async addSaleLots(data) {
    const result = await this.#saleLotModel.insertMany(data)
    return result
  }

  static async updateSale(billId, payment = 0) {
    const result = await this.#model.updateOne({ billId }, { $inc: { 'payment.received': payment } })
    return result
  }
}

export default SaleModel;