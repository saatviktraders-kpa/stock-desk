import ProductModel from "../model/product.js";
import RestError from "../utils/error.js";
import { getPaginationOptions, getPaginationResult } from "../utils/pagination.js";
import PDFEngine from '../pdf-engine/index.js'
import moment from "moment";
import SaleModel from "../model/sale.js";

class ProductController {
  static async getProductList(req, res) {
    try {
      const query = { isDeleted: false };
      const options = getPaginationOptions(req.query);
      if (req.query.search)
        query.name = { $regex: req.query.search, $options: 'i' };
      if (req.query.isDeleted)
        query.isDeleted = true;

      const result = await ProductModel.getProductList(query || {}, options);
      const totalCount = await ProductModel.getProductCount(query);

      return res.json({ result, ...getPaginationResult(req.query, totalCount) });
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async getProductDetail(req, res) {
    try {
      const { _id } = req.params;

      const results = await ProductModel.getProductDetail(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async getProductLots(req, res) {
    try {
      const query = { isDeleted: false };
      if (req.query.pid)
        query.pid = req.query.pid;
      if (req.query.isDeleted)
        query.isDeleted = true;

      const results = await ProductModel.getProductLots(query || {}, req.query.count);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async addProduct(req, res) {
    try {
      const data = req.body;

      const results = await ProductModel.addProduct(data);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async addLot(req, res) {
    try {
      const data = req.body;

      const results = await ProductModel.addLot(data);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async updateProduct(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;

      const results = await ProductModel.updateProduct(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async updateProductLot(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;

      const results = await ProductModel.updateLot(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { _id } = req.params;

      const results = await ProductModel.deleteProduct(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async deleteProductLot(req, res) {
    try {
      const { _id } = req.params;

      const results = await ProductModel.deleteLot(_id);
      return res.json(results);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async getProductStockPDF(req, res) {
    try {
      const { from, to, less, more } = req.query;
      const f = (field) => (from && to) ? { [field]: { $gte: new Date(from), $lte: new Date(to) } } : {};

      let saleMap = await SaleModel.getSaleListShort(f('billDate'));
      saleMap = saleMap.reduce((agg, curr) => {
        for (const p of curr.sale) {
          agg[p.pid] = agg[p.pid] ? agg[p.pid] + p.quantity : p.quantity
        }
        return agg
      }, {})

      const prods = await ProductModel.getProductList({ isDeleted: false })
      let prodStock = prods.map(async p => {
        const lots = await ProductModel.getProductLots({ isDeleted: false, pid: p._id }, true, 'originalQuantity')

        return {
          _id: p._id, name: p.name, hsn: p.hsn, mrp: p.mrp,
          consumed: saleMap[p._id] || 0,
          cost: lots.reduce((agg, curr) => agg + curr.quantity * curr.price, 0),
          available: lots.reduce((agg, curr) => agg + curr.quantity, 0),
          bought: lots.reduce((agg, curr) => agg + ((from && to ? moment(curr.purchaseDate || curr.createdAt).isBetween(from, to) : true) ? curr.originalQuantity : 0), 0),
        }
      })
      prodStock = await Promise.all(prodStock);
      if (less)
        prodStock = prodStock.filter(p => (p.available >= less))
      if (more)
        prodStock = prodStock.filter(p => (p.available <= more))

      const stream = await PDFEngine.generatePDFStream('product-stock', { products: prodStock, during: (from && to) ? { from, to } : null, less, more });
      stream.pipe(res);
    }
    catch (err) {
      console.error(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }
}

export default ProductController;