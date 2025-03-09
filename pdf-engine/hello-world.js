import { Document, Page, Text } from "@react-pdf/renderer";
import { jsx as _jsx } from "react/jsx-runtime";
function HelloWorldPDF() {
  return /*#__PURE__*/_jsx(Document, {
    children: /*#__PURE__*/_jsx(Page, {
      children: /*#__PURE__*/_jsx(Text, {
        style: {
          fontSize: 20,
          textAlign: 'center',
          marginTop: 450
        },
        children: "Hello World"
      })
    })
  });
}
export default HelloWorldPDF;