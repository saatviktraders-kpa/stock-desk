import { useMemo } from 'react'

// const { Document, Page } = lazy(() => import('@react-pdf/renderer'))
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { Table, TD, TR, TH } from '@ag-media/react-pdf-table'
import styles from './styles';
import moment from 'moment';

function BillPDF({ bill }) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={{ fontSize: 10, textAlign: 'center', marginBottom: 12, textDecoration: 'underline' }}>TAX INVOICE</Text>
        <View style={[styles.rowsb, styles.header, { alignItems: 'flex-end' }]}>
          <View>
            <Text style={[styles.heading1, styles.bold, { marginBottom: 5 }]}>SAATVIK TRADERS</Text>
            <Text style={{ fontSize: 10 }}>14/A Kachari Bari Road, Manicktalla</Text>
            <Text style={{ fontSize: 10 }}>Kanchrapara, Dist.- North 24 PGS, PIN-743145</Text>
            <Text style={{ fontSize: 10 }}>West Bengal, India</Text>
            <Text style={{ fontSize: 10 }}>GSTIN: 19BPYPS9484J1ZD</Text>
            <Text style={{ fontSize: 10 }}>Mob: 9331237271/9748896633, Email: saatviktraders.kpa@gmail.com</Text>
          </View>
          <Text style={{ ...styles.bold, fontSize: 10 }}>Bill No.: {bill.billNo}</Text>
        </View>
        <View style={[styles.rowsb, { marginTop: 5 }]}>
          <Text style={[styles.bold, { fontSize: 10 }]}>Bill to</Text>
          <Text style={{ fontSize: 10 }}>Date: {moment().format('DD/MM/YYYY')}</Text>
        </View>
        <View style={{ marginBottom: 10, marginTop: 4 }}>
          <Text style={{ fontSize: 12, ...styles.bold }}>{bill.buyer.name}</Text>
          <Text style={{ fontSize: 10 }}>GSTIN: {bill.buyer.gst}</Text>
          {bill.buyer.address && <Text style={{ fontSize: 10 }}>Address: {bill.buyer.address}</Text>}
          {bill.buyer.contact && <Text style={{ fontSize: 10 }}>Contact: {bill.buyer.contact}</Text>}
          {bill.buyer.placeOfSupply && <Text style={{ fontSize: 10 }}>Place Of Supply: {bill.buyer.placeOfSupply}</Text>}
        </View>
        <BillTable {...bill} />

        <View wrap={false} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
          <View style={{ border: '1 solid black', width: '50%', padding: 2 }}>
            <Text style={{ fontSize: 8 }}>Note:</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', width: '30%', justifyContent: 'flex-end' }}>
            <View style={{ height: 60, borderBottom: '1 solid #999' }}>
            </View>
            <Text style={{ fontSize: 10, marginTop: 6, textAlign: 'right' }}>Saatvik Traders</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

function BillTable({ products, productDetails }) {
  const productMap = useMemo(() => productDetails?.reduce((agg, curr) => ({ ...agg, [curr.uid]: curr }), {}) || {}, [productDetails]);
  const productAmts = products.map((prod, i) => {
    const amount = (prod.rate * prod.quantity);
    const disc = (amount * (prod.discount / 100));
    const taxable = (amount - disc);
    const cgst = (taxable * (prod.cgst / 100));
    const sgst = (taxable * (prod.sgst / 100));
    const net = (taxable + cgst + sgst);

    return {
      i,
      order: { ...prod, gst: prod.cgst + prod.sgst },
      product: productMap[prod.uid],
      calc: { amount, disc, taxable, cgst, sgst, net, gst: cgst + sgst }
    }
  })

  return (
    <>
      <Table trProps={{ wrap: false }} tdStyle={{ fontSize: 8, padding: 1 }} weightings={getWeightings()}>
        <TH style={styles.bold}>
          <TD style={{ justifyContent: 'center' }}>#</TD>
          <TD style={{ justifyContent: 'center' }}>Product Name</TD>
          <TD style={{ justifyContent: 'center' }}>HSN Code</TD>
          <TD style={{ justifyContent: 'center' }}>MRP</TD>
          <TD style={{ justifyContent: 'center' }}>Qty</TD>
          <TD style={{ justifyContent: 'center' }}>Rate</TD>
          <TD style={{ justifyContent: 'center' }}>Amount</TD>
          <TD style={{ justifyContent: 'center' }}>Discount</TD>
          <TD style={{ justifyContent: 'center' }}>GST %</TD>
          <TD style={{ justifyContent: 'center' }}>GST Amt</TD>
          <TD style={{ justifyContent: 'center' }}>Net Amt</TD>
        </TH>
        {productAmts.map((prod) => (
          <TR key={prod.i}>
            <TD style={{ justifyContent: 'center' }}>{prod.i + 1}</TD>
            <TD style={{ overflow: 'hidden' }}>{prod.product.name}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.product.hsn}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.product.mrp.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.order.quantity}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.order.rate.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.amount.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.disc.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.order.gst}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.gst.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.net.toFixed(2)}</TD>
          </TR>
        ))}
      </Table>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 10, padding: 4, borderBottom: '1 solid #bbb', borderTop: '1 solid #bbb', gap: 2 }}>
        <Text style={{ fontSize: 10, ...styles.bold }}>Total: {productAmts.reduce((agg, curr) => agg + curr.calc.net, 0).toFixed(2)}</Text>
        <Text style={{ fontSize: 10 }}>Total SGST (@ 9%): {productAmts.reduce((agg, curr) => agg + curr.calc.sgst, 0).toFixed(2)}</Text>
        <Text style={{ fontSize: 10 }}>Total CGST (@ 9%): {productAmts.reduce((agg, curr) => agg + curr.calc.cgst, 0).toFixed(2)}</Text>
      </View>
    </>
  );
}

function getWeightings() {
  const w = [3, 20, 17, 8, 5, 7, 9, 7, 6, 8, 10]
  return w.map(e => e / 100)
}

export default BillPDF;