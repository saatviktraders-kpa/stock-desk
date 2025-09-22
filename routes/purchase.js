import { Router } from "express";
import PurchaseController from "../controller/purchase.js";

const purchaseRouter = Router();

purchaseRouter.get('/list', PurchaseController.getPurchaseList);
purchaseRouter.get('/detail/:_id', PurchaseController.getPurchaseDetail);
purchaseRouter.post('/create', PurchaseController.createPurchase);
purchaseRouter.put('/update/:_id', PurchaseController.updatePurchase);
purchaseRouter.delete('/delete/:_id', PurchaseController.deletePurchase);

purchaseRouter.get('/order/list/:_id', PurchaseController.getPurchaseOrders);
purchaseRouter.post('/order/add/:_id', PurchaseController.addPurchaseOrder);
purchaseRouter.delete('/order/remove/:_id/:pid', PurchaseController.removePurchaseOrder);
purchaseRouter.put('/order/update/:_id', PurchaseController.updatePurchaseOrder);

purchaseRouter.post('/complete/:_id', PurchaseController.markComplete);

export default purchaseRouter;
