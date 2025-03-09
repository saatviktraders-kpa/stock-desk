import { Document, Page, Text, View } from '@react-pdf/renderer';
import styles from './styles.js';
import Header from './Header.js';
import SaleTable from './SaleTable.js';
import moment from 'moment';
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
        children: "SALE REPORT"
      }), /*#__PURE__*/_jsx(Header, {}), /*#__PURE__*/_jsx(View, {
        style: {
          marginVertical: 10
        },
        children: data.during && /*#__PURE__*/_jsxs(Text, {
          style: {
            fontSize: 10
          },
          children: ["Sale Duration: ", moment(data.during.from).format('DD-MM-YYYY'), " to ", moment(data.during.to).format('DD-MM-YYYY')]
        })
      }), /*#__PURE__*/_jsx(SaleTable, {
        sales: data.sales
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