import { DatePicker, Form, Input, InputNumber, Button, Flex, App, Row, Col } from "antd"
import { useAddProduct, useUpdateProduct } from "../../hooks/product-api"
import { generateUID } from "../../utils/product"
import moment from "moment"

const rule = [{ required: true, message: 'Please enter this field' }]
const dateFormat = ['DD-MM-YYYY', 'MM-YYYY'];

function Create({ onCancel, product }) {
  const addProduct = useAddProduct()
  const updateProduct = useUpdateProduct()
  const { message: msg } = App.useApp()

  async function onFinish(data) {
    try {
      if (product) {
        const { hsn, mfgDate, expDate, name, quantity, price, mrp } = data;
        await updateProduct.mutateAsync({ hsn, mfgDate, expDate, name, quantity, price, mrp, _id: product._id });
        msg.success('Product updated successfully');
      }
      else {
        await addProduct.mutateAsync(data)
        msg.success('Product added successfully');
      }
    }
    catch (err) {
      console.error(err)
      msg.error('Failed to add/update product')
    }
    finally {
      onCancel()
    }
  }

  const randomUID = generateUID();

  const initial = product ? {
    uid: randomUID,
    ...product,
    mfgDate: product.mfgDate ? moment(product.mfgDate) : null,
    expDate: product.expDate ? moment(product.expDate) : null
  } : { uid: randomUID }

  return (
    <>
      <Form
        name='add-prod'
        onFinish={onFinish}
        layout="horizontal"
        labelCol={{ span: 5 }}
        labelAlign="left"
        preserve={false}
        initialValues={initial}
      >
        <Row gutter={[8, 0]}>
          <Col span={12}>
            <Form.Item name='uid' label='Product ID' rules={rule} labelCol={{ span: 10 }}>
              <Input placeholder="Enter Product ID" disabled={Boolean(product)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='hsn' label='HSN Code' rules={rule}>
              <Input placeholder="Enter HSN Code" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='name' label='Name' rules={rule}>
          <Input placeholder="Enter Name" />
        </Form.Item>
        <Form.Item name='mfgDate' label='Manufactured Date' help={dateFormat.join(' or ')}>
          <DatePicker style={{ width: '40%' }} format={dateFormat} />
        </Form.Item>
        <Form.Item name='expDate' label='Expiry Date' help={dateFormat.join(' or ')}>
          <DatePicker style={{ width: '40%' }} format={dateFormat} />
        </Form.Item>
        <Form.Item name='quantity' label='Quantity' rules={rule}>
          <InputNumber placeholder="Enter Quantity" style={{ width: '40%' }} />
        </Form.Item>
        <Form.Item name='price' label='Price' rules={rule}>
          <InputNumber placeholder="Enter Price" style={{ width: '40%' }} />
        </Form.Item>
        <Form.Item name='mrp' label='MRP' rules={rule}>
          <InputNumber placeholder="Enter Product MRP" style={{ width: '40%' }} />
        </Form.Item>
        <Flex justify='end' gap={10}>
          <Button disabled={addProduct.isLoading} onClick={onCancel}>Cancel</Button>
          <Button loading={addProduct.isLoading} htmlType="submit" type="primary">{product ? 'Update' : 'Add'}</Button>
        </Flex>
      </Form>
    </>
  )
}

export default Create