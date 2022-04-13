import { useEffect, useState } from 'react';
import { SORT, DIRECTION } from '../constants/filter';

const useFilters = (fetchData) => {
  const [isInitialized, setInitialized] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    sort: 'created',
    direction: 'desc',
  });

  const optimizedSetFilters = (reposLength, resetInfiniteScroll) => (value, filterType) => {
    if ((filterType === SORT || filterType === DIRECTION) && !reposLength) return;

    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    resetInfiniteScroll();
  };

  useEffect(() => {
    if (!isInitialized) return;

    fetchData(filters, 1);
  }, [filters]);

  return { setInitialized, filters, setFilters: optimizedSetFilters };
};

export default useFilters;
