import { Router } from "express";
import ProductController from "../controller/product.js";

const productRouter = Router();

productRouter.get('/list', ProductController.getProductList);
productRouter.get('/detail/:_id', ProductController.getProductDetail);
productRouter.post('/create', ProductController.addProduct);
productRouter.put('/update/:_id', ProductController.updateProduct);
productRouter.delete('/delete/:_id', ProductController.deleteProduct);

productRouter.get('/list/lot', ProductController.getProductLots);
productRouter.post('/create/lot', ProductController.addLot);
productRouter.put('/update/lot/:_id', ProductController.updateProductLot);
productRouter.delete('/delete/lot/:_id', ProductController.deleteProductLot);

productRouter.get('/pdf', ProductController.getProductStockPDF);

export default productRouter;
