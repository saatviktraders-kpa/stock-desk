import { Document, Page, Text, View } from '@react-pdf/renderer';
import styles from './styles.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Total from './Total.js';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function DeliveryNote({
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
        children: "DELIVERY NOTE"
      }), /*#__PURE__*/_jsx(Header, {
        bill: data
      }), /*#__PURE__*/_jsxs(View, {
        children: [/*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10,
            fontWeight: 700
          },
          children: "Description of Items"
        }), /*#__PURE__*/_jsxs(Text, {
          style: {
            fontSize: 10
          },
          children: ["Total Items: ", data.order.length]
        }), /*#__PURE__*/_jsxs(Text, {
          style: {
            fontSize: 10
          },
          children: ["Total Quantity: ", data.order.reduce((agg, curr) => agg + curr.quantity, 0)]
        })]
      }), /*#__PURE__*/_jsx(Total, {
        order: data.order
      }), /*#__PURE__*/_jsx(Footer, {
        data: data
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
export default DeliveryNote;