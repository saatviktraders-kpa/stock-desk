import Client from './client';

export async function getBills() {
  const { data } = await Client.get(`/bill/list`);
  return data;
}

export async function getBillDetail(id) {
  const { data } = await Client.get(`/bill/detail/${id}`);
  return data;
}

export async function getBillProductDetail(id) {
  const { data } = await Client.get(`/bill/detail/product/${id}`);
  return data;
}

export async function createBill(data) {
  const response = await Client.post('/bill/create', data);
  return response
}

export async function updateBill({ id, data: body }) {
  const { data } = await Client.put(`/bill/update/${id}`, body);
  return data
}

export async function completeBill(id) {
  const { data } = await Client.post(`/bill/complete/${id}`);
  return data
}

export async function deleteBill(id) {
  const { data } = await Client.delete(`/bill/delete/${id}`);
  return data
}