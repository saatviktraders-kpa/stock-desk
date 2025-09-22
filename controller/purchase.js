import PurchaseModel from "../model/purchase.js";
import { getPaginationOptions, getPaginationResult } from "../utils/pagination.js";
import RestError from "../utils/error.js";

class PurchaseController {
  static async getPurchaseList(req, res) {
    try {
      const query = {};
      const options = getPaginationOptions(req.query);

      const result = await PurchaseModel.getPurchaseList(query || {}, { ...options, sort: { createdAt: -1 } });
      const totalCount = await PurchaseModel.getPurchaseCount(query);

      return res.json({ result, ...getPaginationResult(req.query, totalCount) });
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async getPurchaseDetail(req, res) {
    try {
      const { _id } = req.params;
      const results = await PurchaseModel.getPurchaseDetail(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async getPurchaseOrders(req, res) {
    try {
      const { _id } = req.params;
      const results = await PurchaseModel.getPurchaseOrders(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async createPurchase(req, res) {
    try {
      const { body } = req;
      const data = {
        ...body,
        purchase: []
      }

      const results = await PurchaseModel.createPurchase(data);

      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async updatePurchase(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      const results = await PurchaseModel.updatePurchase(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async deletePurchase(req, res) {
    try {
      const { _id } = req.params;
      const results = await PurchaseModel.deletePurchase(_id);

      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async addPurchaseOrder(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      const results = await PurchaseModel.addPurchaseOrder(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async updatePurchaseOrder(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      const results = await PurchaseModel.updatePurchaseOrder(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async removePurchaseOrder(req, res) {
    try {
      const { _id, pid } = req.params;
      const results = await PurchaseModel.removePurchaseOrder(_id, pid);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async markComplete(req, res) {
    try {
      const { _id } = req.params;
      const results = await PurchaseModel.markCompleted(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }
}

export default PurchaseController;