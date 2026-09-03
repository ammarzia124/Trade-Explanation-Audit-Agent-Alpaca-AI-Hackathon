import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../lib/alpacaClient';

export function useOrdersQuery() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 2,
  });
}
