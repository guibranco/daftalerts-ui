import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      routingKeys: searchParams.get('routingKeys')?.split(',').filter(Boolean) || [],
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
      minBeds: searchParams.get('minBeds') ? Number(searchParams.get('minBeds')) : null,
      maxBeds: searchParams.get('maxBeds') ? Number(searchParams.get('maxBeds')) : null,
      minBaths: searchParams.get('minBaths') ? Number(searchParams.get('minBaths')) : null,
      propertyTypes: searchParams.get('propertyTypes')?.split(',').filter(Boolean) || [],
      berMin: searchParams.get('berMin') || null,
      search: searchParams.get('search') || '',
      sortBy: searchParams.get('sortBy') || 'receivedAt',
      sortDir: searchParams.get('sortDir') || 'desc',
      view: searchParams.get('view') || 'grid',
    };
  }, [searchParams]);

  const setFilter = useCallback((key: string, value: any) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        next.delete(key);
      } else {
        next.set(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const setFilters = useCallback((newFilters: Record<string, any>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
          next.delete(key);
        } else {
          next.set(key, Array.isArray(value) ? value.join(',') : value.toString());
        }
      });
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return { filters, setFilter, setFilters, clearFilters };
}
