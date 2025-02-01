import Client from './client';

export async function getProducts() {
  const { data } = await Client.get(`/product/list`);
  return data;
}

export async function addProduct(data) {
  const response = await Client.post('/product/create', data);
  return response
}

export async function updateProduct(data) {
  const response = await Client.put('/product/update/' + data._id, data);
  return response
}

export async function deleteProduct(data) {
  const response = await Client.delete('/product/delete/' + data._id + '/' + data.qty);
  return response
}