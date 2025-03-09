import SaleModel from "../model/sale.js";
import RestError from "../utils/error.js";

class SaleController {
  static async getSale(req, res) {
    try {
      const { _id } = req.params;
      const results = await SaleModel.getSale(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async updateSale(req, res) {
    try {
      const { _id } = req.params;
      const { payment } = req.body;
      const results = await SaleModel.updateSale(_id, payment);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }
}

export default SaleController;