import { Router } from "express";
import ProductController from "../controller/product.js";

const productRouter = Router();

productRouter.get('/list', ProductController.list);
productRouter.get('/detail/:_id', ProductController.detail);
productRouter.post('/create', ProductController.create);
productRouter.delete('/delete/:_id/:qty', ProductController.delete);

export default productRouter;
