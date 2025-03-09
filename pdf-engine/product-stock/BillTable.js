import { Text, View } from '@react-pdf/renderer';
import { calculateTableEntries } from '../../utils/bill.js';
import styles from './styles.js';
import Total from './Total.js';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const W = [4, 29, 8, 7, 4, 7, 9, 5, 8, 8, 11].map(e => e / 100);
function BillTable({
  order
}) {
  const products = calculateTableEntries(order);
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
        children: "Qty"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[5]
        }],
        children: "Rate"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[6]
        }],
        children: "Amount"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[7]
        }],
        children: "Disc%"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[8]
        }],
        children: "Disc Amt"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[9]
        }],
        children: "GST(18%)"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellHLast, {
          flex: W[10]
        }],
        children: "Net Amt"
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
        children: prod.quantity
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[5],
          textAlign: 'right'
        }],
        children: prod.rate.toFixed(2)
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[6],
          textAlign: 'right'
        }],
        children: prod.gross.toFixed(2)
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[7],
          textAlign: 'center'
        }],
        children: prod.discount
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[8],
          textAlign: 'right'
        }],
        children: prod.discountAmt.toFixed(2)
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellD, {
          flex: W[9],
          textAlign: 'right'
        }],
        children: (prod.sgst + prod.cgst).toFixed(2)
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellDLast, {
          flex: W[10],
          textAlign: 'right'
        }],
        children: prod.net.toFixed(2)
      })]
    }, prod._id)), /*#__PURE__*/_jsx(Total, {
      products: products
    })]
  });
}
export default BillTable;