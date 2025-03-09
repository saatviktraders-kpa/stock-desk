import { Router } from "express";
import productRouter from "./product.js";
import billRouter from "./bill.js";
import traderRouter from "./trader.js";
import saleRouter from "./sale.js";
import purchaseRouter from "./purchase.js";

const apiRouter = Router();

apiRouter.use('/product', productRouter);
apiRouter.use('/bill', billRouter);
apiRouter.use('/trader', traderRouter);
apiRouter.use('/sale', saleRouter);
apiRouter.use('/purchase', purchaseRouter);

export default apiRouter;