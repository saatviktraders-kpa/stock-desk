import { useMutation, useQuery, useQueryClient } from "react-query";
import { getBills, createBill, getBillDetail, completeBill, getBillProductDetail } from '../services/billing';

export function useBillList() {
  const result = useQuery('bill', getBills);

  return result;
}

export function useBillDetail(id) {
  const result = useQuery(['bill', id], () => getBillDetail(id), { enabled: Boolean(id) });

  return result;
}

export function useBillProductDetail(id) {
  const result = useQuery(['bill', 'product', id], () => getBillProductDetail(id), { enabled: Boolean(id) });

  return result;
}

export function useCreateBill() {
  const queryClient = useQueryClient();

  const mutation = useMutation(createBill, {
    onSuccess: () => {
      queryClient.invalidateQueries('bill')
    }
  })

  return mutation
}

export function useCompleteBill(id) {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => completeBill(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('bill')
      queryClient.invalidateQueries(['bill', id])
    }
  })

  return mutation
}