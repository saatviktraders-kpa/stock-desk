import DB from '../db/index.js';
import productSchema from '../schema/product.js';
import RestError from '../utils/error.js';

class ProductModel {
  static #model;

  static init() {
    this.#model = DB.connection.model('product', productSchema);
  }

  static async list(filter = {}) {
    const result = await this.#model.find({ ...filter, isDeleted: false }).lean();

    return result;
  }

  static async detail(_id) {
    const result = await this.#model.findById(_id).lean();

    if (!result || result.isDeleted)
      throw new RestError(404, 'ERR_NOT_FOUND', 'product not found');

    return result;
  }

  static async searchByUid(uid) {
    const result = await this.#model.findOne({ uid }).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'product not found');

    return result;
  }

  static async create(data) {
    const result = await this.#model.create({ ...data, originalQuantity: data.quantity });

    return result;
  }

  static async delete(_id, qty) {
    const result = await this.#model.findById(_id).lean();

    if (result.quantity === qty) {
      const res = await this.#model.findByIdAndUpdate(_id, { isDeleted: true }, { returnDocument: 'after', lean: true });
      return res;
    }

    const res = await this.#model.findByIdAndUpdate(_id, { quantity: (result.quantity - qty) }, { returnDocument: 'after', lean: true });

    return res;
  }
}

export default ProductModel;