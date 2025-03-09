import { Router } from "express";
import SaleController from "../controller/sale.js";

const saleRouter = Router();

saleRouter.get('/:_id', SaleController.getSale);
saleRouter.put('/:_id', SaleController.updateSale);

export default saleRouter;
