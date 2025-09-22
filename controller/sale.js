import SaleModel from "../model/sale.js";
import RestError from "../utils/error.js";
import PDFEngine from '../pdf-engine/index.js'

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

  static async getSalePDF(req, res) {
    try {
      const { from, to } = req.query;
      const f = { billDate: { $gte: new Date(from), $lte: new Date(to) } };
      const results = await SaleModel.getSaleList(f);

      const stream = await PDFEngine.generatePDFStream('sale-report', { sales: results, during: { from, to } });
      stream.pipe(res)
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }
}

export default SaleController;