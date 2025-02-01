import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../services/product";

export function useProductList() {
  const result = useQuery('product', getProducts);

  return result;
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('product')
    }
  })

  return mutation
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('product')
    }
  })

  return mutation
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('product')
    }
  })

  return mutation
}