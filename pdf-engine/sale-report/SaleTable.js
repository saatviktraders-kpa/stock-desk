function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { Text, View } from '@react-pdf/renderer';
import styles from './styles.js';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const W = [4, 18, 37, 5, 9, 9, 9, 9].map(e => e / 100);
function StockTable({
  sales
}) {
  let totalSale = 0;
  let totalCost = 0;
  let totalReceived = 0;
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
        children: "Bill No"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[2]
        }],
        children: "Name"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[3]
        }],
        children: "Qty"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[4]
        }],
        children: "Cost"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[5]
        }],
        children: "Sale"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellH, {
          flex: W[6]
        }],
        children: "P/L"
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.cellHLast, {
          flex: W[7]
        }],
        children: "Received"
      })]
    }), sales.map((s, i) => {
      const amounts = s.sale.reduce((agg, curr) => _objectSpread(_objectSpread({}, agg), {}, {
        qty: agg.qty + curr.quantity,
        cost: agg.cost + curr.cost,
        sale: agg.sale + curr.net
      }), {
        qty: 0,
        cost: 0,
        sale: 0
      });
      totalSale += amounts.sale;
      totalCost += amounts.cost;
      totalReceived += s.payment.received;
      return /*#__PURE__*/_jsxs(View, {
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
            flex: W[1],
            textAlign: 'center'
          }],
          children: s.billId.billNo
        }), /*#__PURE__*/_jsx(Text, {
          style: [styles.cellD, {
            flex: W[2],
            textAlign: 'left'
          }],
          children: s.billId.buyerId.name || s.billId.buyer.name
        }), /*#__PURE__*/_jsx(Text, {
          style: [styles.cellD, {
            flex: W[3],
            textAlign: 'right'
          }],
          children: amounts.qty
        }), /*#__PURE__*/_jsx(Text, {
          style: [styles.cellD, {
            flex: W[4],
            textAlign: 'right'
          }],
          children: amounts.cost.toFixed(2)
        }), /*#__PURE__*/_jsx(Text, {
          style: [styles.cellD, {
            flex: W[5],
            textAlign: 'right'
          }],
          children: amounts.sale.toFixed(2)
        }), /*#__PURE__*/_jsx(Text, {
          style: [styles.cellD, {
            flex: W[6],
            textAlign: 'right'
          }],
          children: (amounts.sale - amounts.cost).toFixed(2)
        }), /*#__PURE__*/_jsx(Text, {
          style: [styles.cellDLast, {
            flex: W[7],
            textAlign: 'right'
          }],
          children: s.payment.received.toFixed(2)
        })]
      }, i);
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        marginTop: 10
      },
      children: [/*#__PURE__*/_jsxs(Text, {
        style: {
          fontSize: 10
        },
        children: ["Total Sale: ", totalSale.toFixed(2), " INR"]
      }), /*#__PURE__*/_jsxs(Text, {
        style: {
          fontSize: 10
        },
        children: ["Total Cost: ", totalCost.toFixed(2), " INR"]
      }), /*#__PURE__*/_jsxs(Text, {
        style: {
          fontSize: 10
        },
        children: ["Total Received: ", totalReceived.toFixed(2), " INR"]
      }), /*#__PURE__*/_jsxs(Text, {
        style: {
          fontSize: 10
        },
        children: ["Total Profit/Loss: ", (totalSale - totalCost).toFixed(2), " INR"]
      }), /*#__PURE__*/_jsxs(Text, {
        style: {
          fontSize: 10
        },
        children: ["Total Pending: ", (totalSale - totalReceived).toFixed(2), " INR"]
      })]
    })]
  });
}
export default StockTable;