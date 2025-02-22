// import { useSearchParams } from "react-router-dom";
import { useMemo } from 'react'
import { useBillList } from "../../hooks/billing-api"
import { useProductList } from "../../hooks/product-api"
import { useState } from "react";
import { Button, Input, Row, Table, Col, Spin, Alert, Space } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BillListPDF from "../../generators/bill-list";

function BillingList() {
  const [search, setSearch] = useState(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = searchParams.get('page');
  // const size = searchParams.get('size');
  const { data, isLoading, isError } = useBillList();
  const { data: productDetails, isLoading: isLoadingProducts, isError: isErrorProduct } = useProductList();
  const productMap = useMemo(() => productDetails?.reduce((agg, curr) => ({ ...agg, [curr.uid]: curr }), {}) || {}, [productDetails]);

  // useEffect(() => {
  //   setSearchParams({ page: (page || 1), size: (size || 10) })
  // }, [])

  const cols = [
    {
      title: 'Bill No.',
      dataIndex: 'billNo',
      key: 'billNo',
      render: (val, row) => <Link to={'/billing/' + row._id}>{val}</Link>,
    },
    {
      title: 'Buyer Name',
      dataIndex: ['buyer', 'name'],
      key: 'billNo'
    },
    {
      title: 'Buyer GSTIN',
      dataIndex: ['buyer', 'gst'],
      key: 'billNo',
      align: 'center'
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'billNo',
      render: (val) => val.toUpperCase(),
      align: 'center'
    },
    {
      title: 'Product Count',
      dataIndex: 'products',
      key: 'billNo',
      render: (val) => val.length || 0,
      align: 'center'
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'billNo',
      render: (val) => moment(val).format('DD/MM/YYYY hh:mm a'),
      align: 'center'
    },
  ];

  if (isLoading || isLoadingProducts)
    return <Spin />;

  if (isError || isErrorProduct)
    return <Alert type="error" title='Failed to load bills' message='Failed to load bills' />

  const checkSearch = (b) => {
    const str = `${b.billNo} ${b.buyer.name} ${b.buyer.gst}`;

    return str.toLowerCase().includes(search.toLowerCase())
  }

  return (
    <>
      <Row justify='space-between' style={{ margin: '10px 0' }}>
        <Col span={10}>
          <Input placeholder="Search Bills" onChange={(e) => setSearch(e.target.value ?? null)} />
        </Col>
        <Col>
          <Space>
            <Link to='/billing/create'><Button type="primary">Create Bill</Button></Link>
            <PDFDownloadLink document={<BillListPDF bills={data} productMap={productMap} />} fileName={`Bills_${moment().format('DD/MM/YYYY;HH:mm')}`}>
              {({ error, loading }) => (
                <Button loading={loading} disabled={error} danger={error}>{error ? 'PDF Generate Failed' : 'Download Bill List'}</Button>
              )}
            </PDFDownloadLink>
          </Space>
        </Col>
      </Row>
      <Table
        columns={cols}
        dataSource={search ? data.filter(checkSearch) : data}
        rowKey={r => r.billNo}
      />
    </>
  )
}

export default BillingList