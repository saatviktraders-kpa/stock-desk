import { renderToStream } from '@react-pdf/renderer';
import BillPDF from './bill-pdf/index.js';
import HelloWorldPDF from './hello-world.js';
import DeliveryNote from './delivery-note/index.js';
import StockReport from './product-stock/index.js';
import { jsx as _jsx } from "react/jsx-runtime";
const typeMap = {
  'hello-world': HelloWorldPDF,
  'bill': BillPDF,
  'delivery-note': DeliveryNote,
  'product-stock': StockReport
};
class PDFEngine {
  static async generatePDFStream(type, data = {}) {
    const PDFDoc = typeMap[type] || HelloWorldPDF;
    const stream = await renderToStream(/*#__PURE__*/_jsx(PDFDoc, {
      data: data
    }));
    return stream;
  }
}
export default PDFEngine;