import { Document, Page, Text, View } from '@react-pdf/renderer'
import styles from './styles.js';
import Header from './Header.js';
import StockTable from './StockTable.js'

function StockReport({ data }) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text fixed style={{ fontSize: 10, textAlign: 'center', marginBottom: 12, textDecoration: 'underline' }}>STOCK REPORT</Text>
        <Header />
        <StockTable products={data} />
        <Text style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 8 }} fixed render={({ pageNumber, totalPages }) => `Page ${pageNumber}/${totalPages}`} />
      </Page>
    </Document>
  )
}

export default StockReport;