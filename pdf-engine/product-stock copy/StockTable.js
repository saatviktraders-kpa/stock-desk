import { Text, View } from '@react-pdf/renderer';
import styles from './styles.js';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const W = [5, 50, 12, 10, 10, 13].map(e => e / 100);
function StockTable({
  products
}) {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(View, {
      fixed: true,
      style: {
        display: 'flex',
        flexDirection: 'row'
      },
      children: [/*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[0]
        }],
        children: "S.No"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[1]
        }],
        children: "Product Name"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[2]
        }],
        children: "HSN Code"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[3]
        }],
        children: "MRP"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[4]
        }],
        children: "Available Qty"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellHLast, {
          flex: W[5]
        }],
        children: "Purchased Qty"
      })]
    }), products.map((prod, i) => /*#__PURE__*/_jsxs(View, {
      wrap: false,
      style: {
        display: 'flex',
        flexDirection: 'row'
      },
      children: [/*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[0],
          textAlign: 'right'
        }],
        children: i + 1
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[1]
        }],
        children: prod.name
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[2],
          textAlign: 'center'
        }],
        children: prod.hsn
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[3],
          textAlign: 'right'
        }],
        children: prod.mrp.toFixed(2)
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[4],
          textAlign: 'right'
        }],
        children: prod.available
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellDLast, {
          flex: W[5],
          textAlign: 'right'
        }],
        children: prod.bought
      })]
    }, prod._id))]
  });
}
export default StockTable;