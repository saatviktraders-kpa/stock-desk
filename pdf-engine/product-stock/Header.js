import { Text, View } from '@react-pdf/renderer';
import styles from './styles.js';
import moment from 'moment';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Header({}) {
  return /*#__PURE__*/_jsxs(View, {
    fixed: true,
    children: [/*#__PURE__*/_jsx(View, {
      style: [styles.rowsb, styles.header, {
        alignItems: 'flex-end'
      }],
      children: /*#__PURE__*/_jsxs(View, {
        children: [/*#__PURE__*/_jsx(Text, {
          style: [styles.heading1, styles.bold, {
            marginBottom: 5
          }],
          children: "SAATVIK TRADERS"
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10
          },
          children: "14/A Kachari Bari Road, Manicktalla"
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10
          },
          children: "Kanchrapara, Dist.- North 24 PGS, PIN-743145"
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10
          },
          children: "West Bengal, India"
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10
          },
          children: "GSTIN: 19BPYPS9484J1ZD"
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10
          },
          children: "Mob: 9331237271 / 9748896633, Email: saatviktraders.kpa@gmail.com"
        })]
      })
    }), /*#__PURE__*/_jsx(View, {
      style: [styles.rowsb, {
        marginTop: 5
      }],
      children: /*#__PURE__*/_jsxs(Text, {
        style: {
          fontSize: 10
        },
        children: ["Report Date: ", moment().format('DD/MM/YYYY hh:mm a')]
      })
    })]
  });
}
export default Header;