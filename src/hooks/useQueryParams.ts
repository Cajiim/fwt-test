import { useSearchParams } from 'react-router-dom';
import type { TFilter } from '../types';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFilter: TFilter = {
    q: searchParams.get('q') || '',
    author: searchParams.get('author') || '',
    location: searchParams.get('location') || '',
    gte: searchParams.get('created_gte') || '',
    lte: searchParams.get('created_lte') || '',
  };

  const setQueryFilter = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const deleteQueryFilter = (name: string) => {
    searchParams.delete(name);
    setSearchParams(searchParams);
  };

  return { queryFilter, setQueryFilter, deleteQueryFilter };
};

export default useQueryParams;
