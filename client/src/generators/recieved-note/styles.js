import { StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontFamily: 'Helvetica'
  },
  rowsb: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    borderBottom: '1 solid #000',
    paddingBottom: 6
  },
  heading1: {
    fontSize: 20
  },
  bold: {
    fontFamily: 'Helvetica-Bold'
  }
})

export default styles;