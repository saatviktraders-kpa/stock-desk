import { Document, Page, Text } from '@react-pdf/renderer';
import styles from './styles.js';
import Header from './Header.js';
import BillTable from './BillTable.js';
import Footer from './Footer.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function BillPDF({
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
        children: "TAX INVOICE"
      }), /*#__PURE__*/_jsx(Header, {
        bill: data
      }), /*#__PURE__*/_jsx(BillTable, {
        order: data.order
      }), /*#__PURE__*/_jsx(Footer, {}), /*#__PURE__*/_jsx(Text, {
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
export default BillPDF;