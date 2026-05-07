import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFilters } from '../hooks/useFilters';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';
import { formatPrice } from '../lib/format';

export function FilterChips() {
  const { filters, setFilter } = useFilters();
  const { t } = useTranslation();

  const activeChips = React.useMemo(() => {
    const chips: { key: string, label: string, onRemove: () => void }[] = [];

    if (filters.routingKeys.length > 0) {
      chips.push({
        key: 'routingKeys',
        label: `${filters.routingKeys.length} Areas`,
        onRemove: () => setFilter('routingKeys', [])
      });
    }

    if (filters.minPrice || filters.maxPrice) {
      chips.push({
        key: 'price',
        label: `${filters.minPrice || 0} - ${filters.maxPrice || '∞'} €`,
        onRemove: () => {
          setFilter('minPrice', null);
          setFilter('maxPrice', null);
        }
      });
    }

    if (filters.minBeds) {
      chips.push({
        key: 'beds',
        label: `${filters.minBeds}+ ${t('property.beds')}`,
        onRemove: () => setFilter('minBeds', null)
      });
    }

    if (filters.propertyTypes.length > 0) {
      chips.push({
        key: 'propType',
        label: filters.propertyTypes.join(', '),
        onRemove: () => setFilter('propertyTypes', [])
      });
    }

    if (filters.berMin && filters.berMin !== 'Any') {
      chips.push({
        key: 'ber',
        label: `BER ${filters.berMin}+`,
        onRemove: () => setFilter('berMin', null)
      });
    }

    return chips;
  }, [filters, t, setFilter]);

  if (activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 py-4">
      <span className="text-[12px] font-bold text-gray-400 uppercase flex items-center">{t('common.active')}:</span>
      {activeChips.map(chip => (
        <Badge key={chip.key} variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3.5 h-auto rounded-full bg-[#F3F4F6] text-[#333333] border-none shadow-none hover:bg-gray-200 transition-colors">
          <span className="text-[13px] font-medium">{chip.label}</span>
          <button 
            onClick={chip.onRemove}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
