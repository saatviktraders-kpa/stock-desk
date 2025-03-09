import { Router } from "express";
import BillController from '../controller/bill.js';

const billRouter = Router();

billRouter.get('/list', BillController.getBillList);
billRouter.get('/detail/:_id', BillController.getBillDetail);
billRouter.post('/create', BillController.createBill);
billRouter.put('/update/:_id', BillController.updateBill);
billRouter.delete('/delete/:_id', BillController.deleteBill);
// billRouter.get('/detail/product/:_id', BillController.productDetail);
// billRouter.post('/complete/:_id', BillController.complete);

billRouter.get('/order/list/:_id', BillController.getBillOrders);
billRouter.post('/order/add/:_id', BillController.addBillOrder);
billRouter.delete('/order/remove/:_id/:pid', BillController.removeBillOrder);
billRouter.put('/order/update/:_id', BillController.updateBillOrder);

billRouter.post('/state/:_id/:state', BillController.changeState);

billRouter.get('/pdf/:_id', BillController.downloadBillPDF);
billRouter.get('/note/:_id', BillController.downloadDeliveryNote);

export default billRouter;
