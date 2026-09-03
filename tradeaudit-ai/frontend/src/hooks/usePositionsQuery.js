import { useQuery } from '@tanstack/react-query';
import { getPositions } from '../lib/alpacaClient';

export function usePositionsQuery() {
  return useQuery({
    queryKey: ['positions'],
    queryFn: getPositions,
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 2,
  });
}
