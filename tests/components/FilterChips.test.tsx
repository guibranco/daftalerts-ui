import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterChips } from '../../src/components/FilterChips';
import * as useFiltersHook from '../../src/hooks/useFilters';

// Mock useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

// Mock useFilters hook
vi.mock('../../src/hooks/useFilters', () => ({
  useFilters: vi.fn(),
}));

describe('FilterChips', () => {
  it('renders nothing when no filters are active', () => {
    (useFiltersHook.useFilters as any).mockReturnValue({
      filters: {
        routingKeys: [],
        minPrice: null,
        maxPrice: null,
        minBeds: null,
        propertyTypes: [],
        berMin: null,
      },
      setFilter: vi.fn(),
    });

    const { container } = render(<FilterChips />);
    expect(container.firstChild).toBeNull();
  });

  it('renders chips for active filters', () => {
    (useFiltersHook.useFilters as any).mockReturnValue({
      filters: {
        routingKeys: ['D01', 'D02'],
        minPrice: 1000,
        maxPrice: 2000,
        minBeds: 2,
        propertyTypes: ['House'],
        berMin: 'A3',
      },
      setFilter: vi.fn(),
    });

    render(<FilterChips />);

    expect(screen.getByText('2 Areas')).toBeInTheDocument();
    expect(screen.getByText('1000 - 2000 €')).toBeInTheDocument();
    expect(screen.getByText('2+ property.beds')).toBeInTheDocument();
    expect(screen.getByText('House')).toBeInTheDocument();
    expect(screen.getByText('BER A3+')).toBeInTheDocument();
  });

  it('calls setFilter when a chip is removed', () => {
    const setFilter = vi.fn();
    (useFiltersHook.useFilters as any).mockReturnValue({
      filters: {
        routingKeys: [],
        minPrice: null,
        maxPrice: null,
        minBeds: 2,
        propertyTypes: [],
        berMin: null,
      },
      setFilter,
    });

    render(<FilterChips />);
    
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(setFilter).toHaveBeenCalledWith('minBeds', null);
  });
});
