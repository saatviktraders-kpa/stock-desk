import BillModel from '../model/bill.js'
import { getBillNo, getCurrentFinancialYearFilter } from '../utils/bill.js';
import { getPaginationOptions, getPaginationResult } from "../utils/pagination.js";
import RestError from "../utils/error.js";
import PDFEngine from '../pdf-engine/index.js'

class BillController {
  static async getBillList(req, res) {
    try {
      const query = {};
      const options = getPaginationOptions(req.query);
      if (req.query.search)
        query.billNo = { $regex: req.query.search, $options: 'i' };

      const result = await BillModel.getBillList(query || {}, options);
      const totalCount = await BillModel.getBillCount(query);

      return res.json({ result, ...getPaginationResult(req.query, totalCount) });
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async getBillDetail(req, res) {
    try {
      const { _id } = req.params;
      const results = await BillModel.getBillDetail(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async getBillOrders(req, res) {
    try {
      const { _id } = req.params;
      const results = await BillModel.getBillOrders(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async createBill(req, res) {
    try {
      const { body } = req;
      const years = getCurrentFinancialYearFilter(body.billDate);
      // const total = await BillModel.getBillCount(years.filter);
      const { count } = await BillModel.getFyearBillCount(years.label);
      const billNo = getBillNo(count, years.label);
      const data = {
        ...body,
        billNo,
        order: []
      }

      const results = await BillModel.createBill(data);
      await BillModel.updateFyearBillCount(years.label, count + 1);

      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async updateBill(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      const results = await BillModel.updateBill(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async deleteBill(req, res) {
    try {
      const { _id } = req.params;
      const results = await BillModel.deleteBill(_id);
      const fyear = results.billNo.split('/')[1];
      const { count } = await BillModel.getFyearBillCount(fyear);
      await BillModel.updateFyearBillCount(fyear, count - 1);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async addBillOrder(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      const results = await BillModel.addBillOrder(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async updateBillOrder(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      const results = await BillModel.updateBillOrder(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async removeBillOrder(req, res) {
    try {
      const { _id, pid } = req.params;
      const results = await BillModel.removeBillOrder(_id, pid);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async downloadBillPDF(req, res) {
    try {
      const { _id } = req.params;
      const billData = await BillModel.getBillDetail(_id);
      const order = await BillModel.getBillOrders(_id);
      billData.order = order;

      const stream = await PDFEngine.generatePDFStream('bill', billData);
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res)
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async downloadDeliveryNote(req, res) {
    try {
      const { _id } = req.params;
      const billData = await BillModel.getBillDetail(_id);
      const order = await BillModel.getBillOrders(_id);
      billData.order = order;

      const stream = await PDFEngine.generatePDFStream('delivery-note', billData);
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res)
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async changeState(req, res) {
    try {
      const { _id, state } = req.params;
      let results
      if (state === 'delivered') {
        results = await BillModel.markDelivered(_id);
      }
      else if (state === 'completed') {
        results = await BillModel.markCompleted(_id);
      }
      else
        throw new RestError(400, 'ERR_INVALID_CODE', 'invalid state');

      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }
}

export default BillController;
