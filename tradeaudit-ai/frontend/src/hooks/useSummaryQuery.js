import { useQuery } from '@tanstack/react-query';
import { getSummary } from '../lib/alpacaClient';

export function useSummaryQuery() {
  return useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 2,
  });
}
