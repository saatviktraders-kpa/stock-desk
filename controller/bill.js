import log from '../log.js';
import BillModel from '../model/bill.js'
import { getBillNo, getCurrentFinancialYearFilter } from '../utils/bill.js';
import RestError from "../utils/error.js";

class BillController {
  static async list(req, res) {
    try {
      const results = await BillModel.list({});
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async detail(req, res) {
    try {
      const { _id } = req.params;
      const results = await BillModel.detail(_id);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async productDetail(req, res) {
    try {
      const { _id } = req.params;
      const results = await BillModel.productDetail(_id);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async create(req, res) {
    try {
      const years = getCurrentFinancialYearFilter();
      const total = await BillModel.count(years.filter);
      const billNo = getBillNo(total, years.label);

      const data = { ...req.body, billNo };
      const results = await BillModel.create(data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      const results = await BillModel.update(_id, data);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async delete(req, res) {
    try {
      const { _id } = req.params;
      const results = await BillModel.delete(_id);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async complete(req, res) {
    try {
      const { _id } = req.params;
      const results = await BillModel.complete(_id);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }
}

export default BillController;