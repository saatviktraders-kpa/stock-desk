function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { View, Text } from "@react-pdf/renderer";
import { ToWords } from 'to-words';
import styles from "./styles.js";
import { calculateTableEntries } from '../../utils/bill.js';
import { jsxs as _jsxs } from "react/jsx-runtime";
const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: ''
      }
    }
  }
});
function Total({
  order
}) {
  const products = calculateTableEntries(order);
  const gross = products.reduce((agg, curr) => agg + curr.gross, 0).toFixed(2);
  const disc = products.reduce((agg, curr) => agg + curr.discountAmt, 0).toFixed(2);
  const sgst = products.reduce((agg, curr) => agg + curr.sgst, 0).toFixed(2);
  const cgst = products.reduce((agg, curr) => agg + curr.cgst, 0).toFixed(2);
  const net = products.reduce((agg, curr) => agg + curr.net, 0).toFixed(2);
  const round = ((net * 100 % 100).toFixed(0) / 100).toFixed(2);
  const pay = (net - round).toFixed(2);
  return /*#__PURE__*/_jsxs(View, {
    wrap: false,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 2,
      marginTop: 10,
      padding: 4,
      borderBottom: '1 solid #bbb',
      borderTop: '1 solid #bbb'
    },
    children: [/*#__PURE__*/_jsxs(Text, {
      style: {
        fontSize: 10
      },
      children: ["Total Gross Amount: ", gross]
    }), /*#__PURE__*/_jsxs(Text, {
      style: {
        fontSize: 10
      },
      children: ["Total Discount Amount: ", disc]
    }), /*#__PURE__*/_jsxs(Text, {
      style: {
        fontSize: 10
      },
      children: ["Total SGST (@ 9%): ", sgst]
    }), /*#__PURE__*/_jsxs(Text, {
      style: {
        fontSize: 10
      },
      children: ["Total CGST (@ 9%): ", cgst]
    }), /*#__PURE__*/_jsxs(Text, {
      style: {
        fontSize: 10
      },
      children: ["Total Net Amount: ", net]
    }), /*#__PURE__*/_jsxs(Text, {
      style: {
        fontSize: 10
      },
      children: ["Round off: ", round]
    }), /*#__PURE__*/_jsxs(Text, {
      style: _objectSpread({
        fontSize: 10
      }, styles.bold),
      children: ["Total Payable: ", pay, " INR"]
    }), /*#__PURE__*/_jsxs(Text, {
      style: {
        fontSize: 10,
        alignSelf: 'flex-start'
      },
      children: ["Total in words: ", toWords.convert(pay, {
        currency: true
      })]
    })]
  });
}
export default Total;