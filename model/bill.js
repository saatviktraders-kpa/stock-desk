import DB from '../db/index.js';
import billSchema from '../schema/bill.js';
import RestError from '../utils/error.js';
import ProductModel from './product.js';

class BillModel {
  static #model;

  static init() {
    this.#model = DB.connection.model('bill', billSchema);
  }

  static async list(filter = {}) {
    const result = await this.#model.find(filter).lean();

    return result;
  }

  static async count(filter = {}) {
    const result = await this.#model.countDocuments(filter);

    return result;
  }

  static async detail(_id) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    const prods = result.products.map(p => ProductModel.searchByUid(p.uid));
    const res = await Promise.all(prods);
    result.productDetails = res;

    return result;
  }

  static async productDetail(_id) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    const prods = result.products.map(p => ProductModel.searchByUid(p.uid));
    const res = await Promise.all(prods);

    return res;
  }

  static async create(data) {
    const result = await this.#model.create(data);

    return result;
  }

  static async delete(_id) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    await this.#model.findByIdAndDelete(_id);
    return result;
  }

  static async complete(_id) {
    const result = await this.#model.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'bill not found');

    if (result.state === 'completed')
      throw new RestError(400, 'ERR_ALREADY_COMPLETED', 'bill already completed');

    const products = result.products;
    const updations = []

    for (const prod of products) {
      const product = await ProductModel.searchByUid(prod.uid);

      if (product.quantity < prod.quantity)
        throw new RestError(404, 'ERR_NOT_ENOUGH_PRODUCT', 'not enough product in stock');

      updations.push({ _id: product._id, qty: prod.quantity })
    }

    for (const u of updations) {
      await ProductModel.delete(u._id, u.qty);
    }

    const res = await this.#model.findByIdAndUpdate(_id, { state: 'completed' }, { returnDocument: 'after', lean: true });
    return res;
  }
}

export default BillModel;