// import { useSearchParams } from "react-router-dom";
import { useDeleteProduct, useProductList } from "../../hooks/product-api"
import { useState } from "react";
import { Button, Input, Row, Table, Col, Spin, Alert, Modal, Typography, Flex, App } from "antd";
import Create from "./Create";
import moment from "moment";
// import ListPDF from "./ListPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InventoryPDF from "../../generators/inventory";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const { message } = App.useApp();
  const [isUpdateOpen, setIsUpdateOpen] = useState(null);
  // const [isProductListOpen, setProductListOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const deleteProduct = useDeleteProduct()
  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = searchParams.get('page');
  // const size = searchParams.get('size');
  const { data, isLoading, isError } = useProductList();

  // useEffect(() => {
  //   setSearchParams({ page: (page || 1), size: (size || 10) })
  // }, [])
  async function deleteProd(data) {
    try {
      await deleteProduct.mutateAsync(data)
      message.success('Product deleted sucessfully');
    }
    catch {
      message.error('Product deletion failed');
    }
  }

  const cols = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
      align: 'center'
    },
    {
      title: 'HSN Code',
      dataIndex: 'hsn',
      key: 'uid',
      align: 'center'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mfg Date',
      dataIndex: 'mfgDate',
      key: 'name',
      render: (val) => moment(val).format('DD/MM/YYYY'),
      align: 'center'
    },
    {
      title: 'Exp Date',
      dataIndex: 'expDate',
      key: 'name',
      render: (val) => moment(val).format('DD/MM/YYYY'),
      align: 'center'
    },
    {
      title: 'Price (INR)',
      dataIndex: 'price',
      key: 'name',
      align: 'center'
    },
    {
      title: 'MRP (INR)',
      dataIndex: 'mrp',
      key: 'uid',
      align: 'center'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'name',
      align: 'center'
    },
    {
      title: 'Actions',
      dataIndex: 'uid',
      key: 'name',
      align: 'center',
      render: (_, row) => (
        <Row justify='center' style={{ gap: 10 }}>
          <Button icon={<EditOutlined />} onClick={() => setIsUpdateOpen(row)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => deleteProd({ _id: row._id, qty: row.quantity })} />
        </Row>
      )
    },
  ];

  if (isLoading)
    return <Spin />;

  if (isError)
    return <Alert type="error" title='Failed to load products' message='Failed to load products' />

  const checkSearch = (d) => {
    const str = `${d.name} ${d.hsn} ${d.uid} ${moment(d.mfgDate).format('DD/MM/YYYY')} ${moment(d.expDate).format('DD/MM/YYYY')}`;

    return str.toLowerCase().includes(search.toLowerCase())
  }

  return (
    <>
      <Row justify='space-between' style={{ margin: '10px 0' }}>
        <Col span={10}>
          <Input placeholder="Search Products" onChange={(e) => setSearch(e.target.value ?? null)} />
        </Col>
        <Flex gap={10}>
          <PDFDownloadLink document={<InventoryPDF products={search ? data.filter(checkSearch) : data} />} fileName={`Inventory_${moment().format('DD/MM/YYYY;HH:mm')}`}>
            {({ error, loading }) => (
              <Button loading={loading} disabled={error} danger={error}>{error ? 'PDF Generate Failed' : 'Download Inventory List'}</Button>
            )}
          </PDFDownloadLink>
          {/* <Button onClick={() => setProductListOpen(true)}>Download List</Button> */}
          <Button type="primary" onClick={() => setIsOpen(true)}>Add Product</Button>
        </Flex>
      </Row>
      <Table
        columns={cols}
        dataSource={search ? data.filter(checkSearch) : data}
        rowKey={r => r.uid}
      />
      {/* <Modal title={<Typography.Title level={4}>Download Product List</Typography.Title>} open={isProductListOpen} onCancel={() => setProductListOpen(false)} width='40vw' footer={null} maskClosable={false} destroyOnClose>
        <ListPDF products={data} />
      </Modal> */}
      <Modal title={<Typography.Title level={4}>Add Product</Typography.Title>} open={isOpen} onCancel={() => setIsOpen(false)} width='50vw' footer={null} maskClosable={false} destroyOnClose>
        <Create onCancel={() => setIsOpen(false)} />
      </Modal>
      <Modal title={<Typography.Title level={4}>Update Product</Typography.Title>} open={Boolean(isUpdateOpen)} onCancel={() => setIsUpdateOpen(false)} width='50vw' footer={null} maskClosable={false} destroyOnClose>
        <Create product={isUpdateOpen} onCancel={() => setIsUpdateOpen(false)} />
      </Modal>
    </>
  )
}

export default Product