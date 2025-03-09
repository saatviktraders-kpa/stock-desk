import { Document, Page, Text, View } from '@react-pdf/renderer';
import styles from './styles.js';
import Header from './Header.js';
import StockTable from './StockTable.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function StockReport({
  data
}) {
  return /*#__PURE__*/_jsx(Document, {
    children: /*#__PURE__*/_jsxs(Page, {
      size: "A4",
      style: styles.page,
      children: [/*#__PURE__*/_jsx(Text, {
        fixed: true,
        style: {
          fontSize: 10,
          textAlign: 'center',
          marginBottom: 12,
          textDecoration: 'underline'
        },
        children: "STOCK REPORT"
      }), /*#__PURE__*/_jsx(Header, {}), /*#__PURE__*/_jsx(StockTable, {
        products: data
      }), /*#__PURE__*/_jsx(Text, {
        style: {
          position: 'absolute',
          bottom: 10,
          right: 10,
          fontSize: 8
        },
        fixed: true,
        render: ({
          pageNumber,
          totalPages
        }) => `Page ${pageNumber}/${totalPages}`
      })]
    })
  });
}
export default StockReport;