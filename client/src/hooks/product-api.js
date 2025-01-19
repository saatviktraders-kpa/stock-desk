import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProduct, getProducts } from "../services/product";

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