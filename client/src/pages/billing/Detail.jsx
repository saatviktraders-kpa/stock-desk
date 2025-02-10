import { Spin, Alert, Typography, Card, Divider, Row, Col, Flex, Table, Button, Popconfirm, App, Space } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom"
import { useBillDetail, useBillProductDetail, useCompleteBill, useDeleteBill } from "../../hooks/billing-api";
import { useMemo } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BillPDF from '../../generators/bill-pdf';
import moment from 'moment';
import RecieveNotePDF from '../../generators/recieved-note';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const { data, isLoading, isError } = useBillDetail(id);
  const deleteBill = useDeleteBill(id)
  const { data: productDetails, isLoading: isLoadingProducts, isError: isErrorProducts } = useBillProductDetail(id);
  const { message: msg } = App.useApp()
  const completeBill = useCompleteBill(id)
  const productMap = useMemo(() => productDetails?.reduce((agg, curr) => ({ ...agg, [curr.uid]: curr }), {}) || {}, [productDetails]);

  if (isLoading || isLoadingProducts)
    return <Spin />;

  if (isError || isErrorProducts)
    return <Alert type="error" title='Failed to load bill' message='Failed to load bill' />

  async function onDelete() {
    try {
      await deleteBill.mutateAsync();
      msg.success('Bill deleted Successfully')
      navigate('/billing')

    }
    catch (err) {
      console.error(err)
      msg.error('Failed to delete bill')
    }
  }

  async function onComplete() {
    try {
      await completeBill.mutateAsync();
      msg.success('Bill Completed Successfully')
    }
    catch (err) {
      console.error(err)
      msg.error('Failed to complete bill')
    }
  }

  const cols = [
    {
      title: 'Product UID',
      dataIndex: 'uid'
    },
    {
      title: 'Product Name',
      dataIndex: 'uid',
      render: v => productMap[v].name
    },
    {
      title: 'Quantity Ordered',
      dataIndex: 'quantity',
      align: 'center'
    },
    {
      title: 'Quantity Available',
      dataIndex: 'uid',
      render: v => productMap[v].quantity,
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'uid',
      render: (v, row) => {
        if (data.state === 'completed')
          return <Typography.Text>COMPLETED</Typography.Text>

        const isAvailable = productMap[v].quantity >= row.quantity;
        return <Typography.Text type={isAvailable ? 'success' : 'danger'}>{isAvailable ? "AVAILABLE" : 'NOT AVAILABLE'}</Typography.Text>
      },
      align: 'center'
    },
  ]

  return (
    <Card>
      <Row justify='space-between'>
        <Typography.Title level={3} style={{ margin: 0 }}>{data.billNo}</Typography.Title>
        <Space size='large'>
          <Typography.Title level={5} style={{ margin: 0 }}>{data.state.toUpperCase()}</Typography.Title>
          <Popconfirm title='Are you sure?' onConfirm={onDelete}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Link to={'/billing/update/' + id}>
            <Button icon={<EditOutlined />} />
          </Link>
        </Space>
      </Row>
      <Divider />
      <Row>
        <Col span={8}><Typography.Text><strong>Buyer Name:</strong> {data.buyer.name}</Typography.Text></Col>
        <Col span={8}><Typography.Text><strong>Buyer GSTIN:</strong> {data.buyer.gst}</Typography.Text></Col>
        <Col span={8}><Typography.Text><strong>Buyer Contact:</strong> {data.buyer.contact}</Typography.Text></Col>
        <Col span={24}><Typography.Text><strong>Address:</strong> {data.buyer.address}</Typography.Text></Col>
        <Col span={24}><Typography.Text><strong>Place of Supply:</strong> {data.buyer.placeOfSupply}</Typography.Text></Col>
      </Row>
      <Divider />
      <Table columns={cols} dataSource={data.products} rowKey={p => p.uid} pagination={false} />
      <Flex justify='end' gap={16} style={{ marginTop: 20 }}>
        <PDFDownloadLink document={<RecieveNotePDF bill={{ ...data, productDetails }} />} fileName={`Recieve_Note_${data.billNo}_${moment().format('DD/MM/YYYY;HH:mm')}`}>
          {({ error, loading }) => (
            <Button loading={loading} disabled={error} danger={error}>{error ? 'PDF Generate Failed' : 'Download Receive Note'}</Button>
          )}
        </PDFDownloadLink>
        <PDFDownloadLink document={<BillPDF bill={{ ...data, productDetails }} />} fileName={`Invoice_${data.billNo}_${moment().format('DD/MM/YYYY;HH:mm')}`}>
          {({ error, loading }) => (
            <Button loading={loading} disabled={error} danger={error}>{error ? 'PDF Generate Failed' : 'Download Invoice'}</Button>
          )}
        </PDFDownloadLink>
        {data.state === 'draft' && (
          <Popconfirm
            title='Are you sure?'
            description='This action is irreversible. It will subtract ordered quantity from available stock.'
            onConfirm={onComplete}
          >
            <Button type='primary'>Mark Complete</Button>
          </Popconfirm>
        )}
      </Flex>
      {/* <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <RecieveNotePDF bill={{ ...data, productDetails }} />
      </PDFViewer> */}
    </Card>
  )
}

export default Detail