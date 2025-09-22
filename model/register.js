import BillModel from "./bill.js";
import TraderModel from "./trader.js";
import ProductModel from "./product.js";
import SaleModel from "./sale.js";
import PurchaseModel from "./purchase.js";

export default function () {
  ProductModel.init()
  BillModel.init()
  TraderModel.init()
  SaleModel.init()
  PurchaseModel.init()
}