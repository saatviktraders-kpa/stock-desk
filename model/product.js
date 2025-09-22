import DB from '../db/index.js';
import { productSchema, lotSchema } from '../schema/product.js';
import RestError from '../utils/error.js';

class ProductModel {
  static #productModel;
  static #lotModel;

  static init() {
    this.#productModel = DB.connection.model('product', productSchema);
    this.#lotModel = DB.connection.model('lot', lotSchema);
  }

  static async getProductCount(filter = {}) {
    const result = await this.#productModel.countDocuments(filter);

    return result;
  }

  static async getProductList(filter = {}, options = null) {
    const result = await this.#productModel.find(filter, null, options).lean();

    return result;
  }

  static async getProductLots(filter = {}, short = false, custom = null) {
    const result = await this.#lotModel.find(filter, short ? 'quantity price createdAt purchaseDate' + (custom ? ` ${custom}` : '') : null).lean();

    return result;
  }

  static async getProductDetail(_id) {
    const result = await this.#productModel.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'product not found');

    return result;
  }

  static async getLotDetail(_id) {
    const result = await this.#lotModel.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'lot not found');

    return result;
  }

  static async addProduct(data) {
    const result = await this.#productModel.create(data);

    return result;
  }

  static async addLot(data) {
    const result = await this.#lotModel.create({ ...data, originalQuantity: data.quantity });

    return result;
  }

  static async updateProduct(_id, data) {
    const res = await this.#productModel.findByIdAndUpdate(_id, data, { returnDocument: 'after', lean: true });

    return res;
  }

  static async updateLot(_id, data) {
    const res = await this.#lotModel.findByIdAndUpdate(_id, data, { returnDocument: 'after', lean: true });

    return res;
  }

  static async deleteProduct(_id) {
    const result = await this.#productModel.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'product not found');

    await this.#lotModel.updateMany({ pid: _id }, { isDeleted: true });
    await this.#productModel.findByIdAndUpdate(_id, { isDeleted: true });

    return result;
  }

  static async deleteLot(_id) {
    const result = await this.#lotModel.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'lot not found');

    await this.#lotModel.findByIdAndUpdate(_id, { isDeleted: true });

    return result;
  }

  static async lotBulkOps(ops) {
    const res = await this.#lotModel.bulkWrite(ops);
    return res;
  }

  static async reduceLot(_id, qty) {
    const result = await this.#lotModel.findById(_id).lean();
    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'lot not found');

    if (result.quantity < qty)
      throw new RestError(404, 'ERR_NOT_ENOUGH_QTY', 'lot quantity is less than required');

    const quantity = result.quantity - qty;
    const updateData = {
      quantity,
      isDeleted: quantity === 0 ? true : false
    };

    const res = await this.#lotModel.findByIdAndUpdate(_id, updateData, { returnDocument: 'after', lean: true });

    return res;
  }

  static async getProductStock() {

  }
}

export default ProductModel;