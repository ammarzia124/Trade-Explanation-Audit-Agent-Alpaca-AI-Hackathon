import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from '../lib/alpacaClient';

export function usePortfolioQuery() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 2,
  });
}
