import { Router } from "express";
import productRouter from "./product.js";
import billRouter from "./bill.js";

const apiRouter = Router();

apiRouter.use('/product', productRouter);
apiRouter.use('/bill', billRouter);

export default apiRouter;