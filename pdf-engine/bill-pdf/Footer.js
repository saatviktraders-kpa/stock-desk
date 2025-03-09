import { Text, View } from '@react-pdf/renderer';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function Footer() {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(View, {
      wrap: false,
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6,
        marginTop: 8,
        borderTop: '1px solid black'
      },
      children: [/*#__PURE__*/_jsx(View, {
        style: {
          border: '1 solid black',
          width: '50%',
          padding: 2
        },
        children: /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 8
          },
          children: "Note:"
        })
      }), /*#__PURE__*/_jsxs(View, {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          justifyContent: 'flex-end'
        },
        children: [/*#__PURE__*/_jsx(View, {
          style: {
            height: 60,
            borderBottom: '1 solid #999'
          }
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            fontSize: 10,
            marginTop: 6,
            textAlign: 'right'
          },
          children: "Saatvik Traders"
        })]
      })]
    })
  });
}
export default Footer;