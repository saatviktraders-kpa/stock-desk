import Client from './client';

export async function getProducts() {
  const { data } = await Client.get(`/product/list`);
  return data;
}

export async function addProduct(data) {
  const response = await Client.post('/product/create', data);
  return response
}