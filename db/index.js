import mongoose from "mongoose";
import log from "../log.js";

class DB {
  static #connection;

  static async init(uri, registerModels) {
    await mongoose.connect(uri);
    log.info('Connected to DB');
    this.#connection = mongoose.connection;
    registerModels();
  }

  static get connection() {
    return this.#connection;
  }
}

export default DB;