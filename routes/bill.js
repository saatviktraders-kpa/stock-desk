import { Router } from "express";
import BillController from '../controller/bill.js';

const billRouter = Router();

billRouter.get('/list', BillController.list);
billRouter.get('/detail/:_id', BillController.detail);
billRouter.get('/detail/product/:_id', BillController.productDetail);
billRouter.post('/create', BillController.create);
billRouter.post('/complete/:_id', BillController.complete);
billRouter.delete('/delete/:_id', BillController.delete);

export default billRouter;
