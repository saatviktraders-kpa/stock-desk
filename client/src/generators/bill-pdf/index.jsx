import { useMemo } from 'react'
import { Document, Page, Text } from '@react-pdf/renderer'
import { Table, TD, TR, TH } from '@ag-media/react-pdf-table'
import styles from './styles';
import Header from './Header';
import Footer from './Footer';
import Total from './Total';

const W = [4, 29, 8, 7, 4, 7, 9, 5, 8, 8, 11].map(e => e / 100)
const PROD_PER_PAGE = 45;

function BillPDF({ bill }) {
  const productMap = useMemo(() => bill?.productDetails?.reduce((agg, curr) => ({ ...agg, [curr.uid]: curr }), {}) || {}, [bill?.productDetails]);
  const productAmts = useMemo(() => bill?.products.map((p, i) => calculate(p, i, productMap)), [bill?.products])
  const totalPages = Math.ceil(productAmts?.length / PROD_PER_PAGE);

  return (
    <Document>
      {
        Array.from(Array(totalPages).keys()).map((a, i) => (
          <Page key={i} size='A4' style={styles.page}>
            <Text style={{ fontSize: 10, textAlign: 'center', marginBottom: 12, textDecoration: 'underline' }}>TAX INVOICE</Text>
            <Header bill={bill} />
            <BillTable products={productAmts?.slice(i * PROD_PER_PAGE, (i + 1) * PROD_PER_PAGE)} />
            {i === totalPages - 1 && <Total products={productAmts} />}
            {i === totalPages - 1 && <Footer />}
            <Text style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 10 }} fixed render={({ pageNumber, totalPages }) => `Page ${pageNumber}/${totalPages}`} />
          </Page>
        ))
      }
    </Document>
  )
}

function BillTable({ products }) {
  return (
    <>
      <Table trProps={{ wrap: false }} tdStyle={{ fontSize: 8, padding: 1 }} weightings={W}>
        <TH style={styles.bold}>
          <TD style={{ justifyContent: 'center' }}>S.No</TD>
          <TD style={{ justifyContent: 'center' }}>Product Name</TD>
          <TD style={{ justifyContent: 'center' }}>HSN Code</TD>
          <TD style={{ justifyContent: 'center' }}>MRP</TD>
          <TD style={{ justifyContent: 'center' }}>Qty</TD>
          <TD style={{ justifyContent: 'center' }}>Rate</TD>
          <TD style={{ justifyContent: 'center' }}>Amount</TD>
          <TD style={{ justifyContent: 'center' }}>Disc%</TD>
          <TD style={{ justifyContent: 'center' }}>Disc</TD>
          <TD style={{ justifyContent: 'center' }}>GST(18%)</TD>
          <TD style={{ justifyContent: 'center' }}>Net Amt</TD>
        </TH>
        {products.map((prod) => (
          <TR key={prod.i}>
            <TD style={{ justifyContent: 'center' }}>{prod.i + 1}</TD>
            <TD style={{ overflow: 'hidden' }}>{prod.product.name}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.product.hsn}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.product.mrp.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.order.quantity}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.order.rate.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.amount.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'center' }}>{prod.order.discount}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.disc.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.gst.toFixed(2)}</TD>
            <TD style={{ justifyContent: 'flex-end' }}>{prod.calc.net.toFixed(2)}</TD>
          </TR>
        ))}
      </Table>
    </>
  );
}

function calculate(prod, i, map) {
  const amount = (prod.rate * prod.quantity);
  const disc = (amount * (prod.discount / 100));
  const taxable = (amount - disc);
  const cgst = (taxable * (prod.cgst / 100));
  const sgst = (taxable * (prod.sgst / 100));
  const net = (taxable + cgst + sgst);

  return {
    i,
    order: { ...prod, gst: prod.cgst + prod.sgst },
    product: map[prod.uid],
    calc: { amount, disc, taxable, cgst, sgst, net, gst: cgst + sgst }
  }
}

export default BillPDF;