import { DatePicker, Form, Input, InputNumber, Button, Flex, App, Row, Col } from "antd"
import { useAddProduct } from "../../hooks/product-api"
import { generateUID } from "../../utils/product"

const rule = [{ required: true, message: 'Please enter this field' }]

function Create({ onCancel }) {
  const addProduct = useAddProduct()
  const { message: msg } = App.useApp()

  async function onFinish(data) {
    try {
      await addProduct.mutateAsync(data)
      msg.success('Product added successfully');
      onCancel()
    }
    catch (err) {
      console.error(err)
      msg.error('Failed to add product')
    }
  }

  const randomUID = generateUID();

  return (
    <>
      <Form
        name='add-prod'
        onFinish={onFinish}
        layout="horizontal"
        labelCol={{ span: 5 }}
        labelAlign="left"
        preserve={false}
      >
        <Row gutter={[8, 0]}>
          <Col span={12}>
            <Form.Item name='uid' label='Product ID' rules={rule} initialValue={randomUID} labelCol={{ span: 10 }}>
              <Input placeholder="Enter Product ID" />
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
        <Form.Item name='mfgDate' label='Manufactured Date' rules={rule}>
          <DatePicker style={{ width: '40%' }} />
        </Form.Item>
        <Form.Item name='expDate' label='Expiry Date' rules={rule}>
          <DatePicker style={{ width: '40%' }} />
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
          <Button loading={addProduct.isLoading} htmlType="submit" type="primary">Add</Button>
        </Flex>
      </Form>
    </>
  )
}

export default Create