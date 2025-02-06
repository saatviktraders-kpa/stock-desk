// const { Document, Page } = lazy(() => import('@react-pdf/renderer'))
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { Table, TD, TR, TH } from '@ag-media/react-pdf-table'
import styles from './styles';
import moment from 'moment';

function InventoryPDF({ products }) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={{ fontSize: 10, textAlign: 'center', textDecoration: 'underline' }}>INVENTORY LIST</Text>
        <View style={[styles.rowsb, styles.header, { alignItems: 'flex-end' }]}>
          <View>
            <Text style={[styles.heading1, styles.bold, { marginBottom: 5 }]}>SAATVIK TRADERS</Text>
            <Text style={{ fontSize: 10 }}>14/A Kachari Bari Road, Manicktalla</Text>
            <Text style={{ fontSize: 10 }}>Kanchrapara, Dist.- North 24 PGS, PIN-743145</Text>
            <Text style={{ fontSize: 10 }}>West Bengal, India</Text>
            <Text style={{ fontSize: 10 }}>GSTIN: 19BPYPS9484J1ZD</Text>
            <Text style={{ fontSize: 10 }}>Mob: 9331237271/9748896633, Email: saatviktraders.kpa@gmail.com</Text>
          </View>
        </View>
        <View style={[styles.rowsb, { marginVertical: 5 }]}>
          <Text style={[styles.bold, { fontSize: 10 }]}>Inventory as on: {moment().format('DD/MM/YYYY hh:mm a')}</Text>
          <Text style={{ fontSize: 10 }}>Date: {moment().format('DD/MM/YYYY')}</Text>
        </View>
        <BillTable products={products} />

        {/* <View wrap={false} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, marginBottom: 16 }}>
          <View style={{ border: '1 solid black', width: '50%', padding: 2 }}>
            <Text style={{ fontSize: 8 }}>Note:</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', width: '30%', justifyContent: 'flex-end' }}>
            <View style={{ height: 60, borderBottom: '1 solid #999' }}>
            </View>
            <Text style={{ fontSize: 10, marginTop: 6, textAlign: 'right' }}>Saatvik Traders</Text>
          </View>
        </View> */}
      </Page>
    </Document>
  )
}

function BillTable({ products }) {
  return (
    <>
      <Table trProps={{ wrap: false }} tdStyle={{ fontSize: 8, padding: 1 }} weightings={getWeightings()}>
        <TH style={styles.bold}>
          <TD style={{ justifyContent: 'center' }}>#</TD>
          <TD style={{ justifyContent: 'center' }}>Product ID</TD>
          <TD style={{ justifyContent: 'center' }}>Product Name</TD>
          <TD style={{ justifyContent: 'center' }}>HSN Code</TD>
          <TD style={{ justifyContent: 'center' }}>MRP</TD>
          <TD style={{ justifyContent: 'center' }}>Mfg Date</TD>
          <TD style={{ justifyContent: 'center' }}>Exp Date</TD>
          <TD style={{ justifyContent: 'center' }}>Price</TD>
          <TD style={{ justifyContent: 'center' }}>Qty</TD>
          <TD style={{ justifyContent: 'center' }}>Total Value</TD>
        </TH>
        {products.map((prod, i) => (
          <TR key={i}>
            <TD style={{ justifyContent: 'center' }}>{i + 1}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.uid}</TD>
            <TD style={{ overflow: 'hidden' }}>{prod.name}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.hsn}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.mrp.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.mfgDate ? moment(prod.mfgDate).format('DD/MM/YYYY') : '-'}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.expDate ? moment(prod.expDate).format('DD/MM/YYYY') : '-'}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.price.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.quantity}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{(prod.quantity * prod.price).toFixed(2)}</TD>
          </TR>
        ))}
      </Table>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 10, padding: 4, borderBottom: '1 solid #bbb', borderTop: '1 solid #bbb', gap: 2 }}>
        <Text style={{ fontSize: 10 }}>Total Price: {products.reduce((agg, curr) => agg + curr.quantity * curr.price, 0).toFixed(2)}</Text>
        <Text style={{ fontSize: 10 }}>Total MRP: {products.reduce((agg, curr) => agg + curr.quantity * curr.mrp, 0).toFixed(2)}</Text>
      </View>
    </>
  );
}

function getWeightings() {
  const w = [3, 16, 22, 13, 8, 9, 9, 8, 5, 8]
  return w.map(e => e / 100)
}

export default InventoryPDF;