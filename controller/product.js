import ProductModel from "../model/product.js";
import RestError from "../utils/error.js";

class ProductController {
  static async list(req, res) {
    try {
      const results = await ProductModel.list({});
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
      const results = await ProductModel.detail(_id);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async create(req, res) {
    try {
      const data = req.body;
      const results = await ProductModel.create(data);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async update(req, res) {
    try {
      const { _id } = req.params;
      const data = req.body;
      if (data._id) delete data._id
      console.log(data, _id)
      const results = await ProductModel.update(_id, data);
      return res.json(results);
    }
    catch (err) {
      console.log(err)
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }

  static async delete(req, res) {
    try {
      const { _id, qty } = req.params;
      const results = await ProductModel.delete(_id, qty);
      return res.json(results);
    }
    catch (err) {
      const error = err instanceof RestError ? err.error : new RestError().error;
      return res.status(error.status).json(error);
    }
  }
}

export default ProductController;