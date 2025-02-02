import { Row, Col, Form, Input, InputNumber, Button, Flex, App, Card, Typography, Divider, Select, Alert, Spin } from "antd"
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { useProductList } from "../../hooks/product-api"
import { useBillDetail, useUpdateBill } from "../../hooks/billing-api"
import { useMemo } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const rule = [{ required: true, message: 'Please enter this field' }]

function Create() {
  const { id } = useParams();
  const { data: bill, isLoading: isBillLoading, isError: isBillError } = useBillDetail(id);
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { isLoading, isError, data } = useProductList();
  const updateBill = useUpdateBill()
  const { message: msg } = App.useApp()

  async function onFinish(data) {
    console.log(data)
    // return
    try {
      await updateBill.mutateAsync({ id, data })
      msg.success('Bill updated successfully');
      navigate('/billing/' + id);
    }
    catch (err) {
      console.error(err)
      msg.error('Failed to update bill')
    }
  }

  const productMap = useMemo(() => data?.reduce((agg, curr) => ({ ...agg, [curr.uid]: curr }), {}) || {}, [data]);

  if (isError || isBillError)
    return <Alert type="error" message='Failed to load details' />

  if (isBillLoading || isLoading)
    return <Spin />

  const initial = bill && {
    buyer: bill.buyer,
    products: bill.products
  }

  const client = <>
    <Typography.Title level={5}>Buyer Information</Typography.Title>
    <Divider />
    <Row gutter={[10, 0]}>
      <Col span={12}>
        <Form.Item name={['buyer', 'name']} label='Name' rules={rule} labelCol={{ span: 6 }}>
          <Input placeholder="Enter Name" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['buyer', 'gst']} label='GSTIN' rules={rule} labelCol={{ span: 5 }}>
          <Input placeholder="Enter GSTIN" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['buyer', 'contact']} label='Contact' labelCol={{ span: 5 }}>
          <Input placeholder="Enter Contact Number" />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item name={['buyer', 'address']} label='Address'>
      <Input placeholder="Enter Address" />
    </Form.Item>
    <Form.Item name={['buyer', 'placeOfSupply']} label='Place of Supply' rules={rule}>
      <Input placeholder="Enter Place of Supply" />
    </Form.Item>
  </>

  return (
    <>
      <Card style={{ minHeight: '100%' }}>
        <Typography.Title level={4}>{id ? 'Update' : 'Create'} a Bill</Typography.Title>
        <Divider />
        <Form
          form={form}
          name='add-bill'
          onFinish={onFinish}
          layout="horizontal"
          labelCol={{ span: 3 }}
          labelAlign="left"
          preserve={false}
          initialValues={initial}
        >
          {client}
          <Typography.Title level={5}>Product List</Typography.Title>
          <Divider />
          <Form.List name="products" rules={[{ validator: (_, val) => val && val.length > 0 ? Promise.resolve() : Promise.reject('Atleast 1 product required') }]}>
            {(fields, { add, remove }, { errors }) => (
              <Flex vertical gap={10}>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} size='small' title={`Product ${name + 1}`} extra={<CloseOutlined onClick={() => remove(name)} />}>
                    <Row>
                      <Col span={16}>
                        <Form.Item
                          {...restField}
                          name={[name, 'uid']}
                          rules={[{ required: true, message: 'Missing product UID' }, {
                            validator: (_, val) => (
                              form.getFieldValue('products').find((p, i) => p.uid === val && i !== name) ? Promise.reject('UID already present') : Promise.resolve()
                            )
                          }]}
                        >
                          <Select placeholder="Product UID"
                            style={{ width: '90%' }}
                            loading={isLoading}
                            disabled={isError}
                            options={data?.map(d => ({ label: `${d.name} (${d.uid}) (HSN:${d.hsn})`, value: d.uid })) || []}
                            showSearch
                            optionFilterProp="label"
                            onChange={v => {
                              form.setFieldValue(['products', name, 'quantity'], productMap[v].quantity)
                              form.setFieldValue(['products', name, 'rate'], productMap[v].price)
                              form.setFieldValue(['products', name, 'discount'], 35)
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'quantity']}
                          rules={[{ required: true, message: 'Missing quantity' }, {
                            validator: (_, val) => {
                              const selected = productMap[form.getFieldValue(['products', name, 'uid'])]

                              if (val && selected.quantity < val)
                                return Promise.reject('Cannot apply quantity more than available')
                              return Promise.resolve()
                            }
                          }]}
                        >
                          <InputNumber placeholder="Quantity" style={{ width: '90%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item shouldUpdate>
                          {() => (
                            <Typography.Text>Available: {productMap[form.getFieldValue(['products', name, 'uid'])]?.quantity || '-'}</Typography.Text>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'rate']}
                          rules={[{ required: true, message: 'Missing rate' }, {
                            validator: (_, val) => {
                              const selected = productMap[form.getFieldValue(['products', name, 'uid'])]

                              if (val && selected.mrp < val)
                                return Promise.reject('Cannot apply more than MRP')
                              return Promise.resolve()
                            }
                          }]}
                        >
                          <InputNumber placeholder="Rate" style={{ width: '90%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item shouldUpdate>
                          {() => (
                            <Typography.Text>MRP (INR): {productMap[form.getFieldValue(['products', name, 'uid'])]?.mrp || '-'}</Typography.Text>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={8} style={{ paddingTop: '6px' }}>
                        <Typography.Text>CGST: 9% | SGST: 9% | Total GST: 18%</Typography.Text>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'discount']}
                          rules={[{ required: true, message: 'Missing discount' }, { type: Number, max: 100, min: 0, message: 'Out of limits' }]}
                        >
                          <InputNumber placeholder="Discount" min={0} max={100} style={{ width: '60%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Form.Item style={{ marginTop: '16px' }}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Product
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Flex>
            )}
          </Form.List>
          <Flex justify='end' gap={10} style={{ marginTop: '10px' }}>
            <Link to={-1}><Button disabled={updateBill.isLoading}>Discard</Button></Link>
            <Button loading={updateBill.isLoading} htmlType="submit" type="primary">{id ? 'Update' : 'Create'} Bill</Button>
          </Flex>
        </Form>
      </Card>
    </>
  )
}

export default Create