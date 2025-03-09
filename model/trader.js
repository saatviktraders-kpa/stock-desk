import DB from '../db/index.js';
import traderSchema from '../schema/trader.js';
import RestError from '../utils/error.js';

class TraderModel {
  static #traderModel;

  static init() {
    this.#traderModel = DB.connection.model('trader', traderSchema);
  }

  static async getTraders(filter = {}) {
    const result = await this.#traderModel.find(filter);

    return result;
  }

  static async getTraderDetail(_id) {
    const result = await this.#traderModel.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'trader not found');

    return result;
  }

  static async addTrader(data) {
    const result = await this.#traderModel.create(data);

    return result;
  }

  static async updateTrader(_id, data) {
    const res = await this.#traderModel.findByIdAndUpdate(_id, data, { returnDocument: 'after', lean: true });

    return res;
  }

  static async deleteTrader(_id) {
    const result = await this.#traderModel.findById(_id).lean();

    if (!result)
      throw new RestError(404, 'ERR_NOT_FOUND', 'trader not found');

    await this.#traderModel.findByIdAndUpdate(_id, { isDeleted: true });

    return result;
  }
}

export default TraderModel;