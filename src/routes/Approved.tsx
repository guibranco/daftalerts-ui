import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProperties, useStats } from '../hooks/useProperties';
import { useFilters } from '../hooks/useFilters';
import { formatPrice } from '../lib/format';
import { PropertyCard } from '../components/PropertyCard';
import { MapView } from '../components/MapView';
import { StatsBar } from '../components/StatsBar';
import { PropertyCardSkeleton } from '../components/PropertyCardSkeleton';
import { FilterSheet } from '../components/FilterSheet';
import { FilterChips } from '../components/FilterChips';
import { cn } from '../lib/utils';

export default function Approved() {
  const { t } = useTranslation();
  const { filters } = useFilters();
  const { data, isLoading } = useProperties('approved', filters);
  const { data: stats } = useStats();

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.approved')}</h1>
        <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-sm font-medium">
           {stats ? (
             <span>
               {stats.approvedCount} approved · 
               avg {formatPrice(stats.avgApprovedPrice)} · 
               median {formatPrice(stats.medianApprovedPrice)}
             </span>
           ) : t('common.loading')}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 bg-card p-2 rounded-xl border shadow-sm">
        <FilterSheet />
        <FilterChips />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-[500px]">
        {/* List Pane */}
        <div className="w-full md:w-[40%] flex flex-col gap-4 overflow-y-auto pr-2 max-h-[calc(100vh-350px)]">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))
          ) : data?.items.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              view="list" 
            />
          ))}
        </div>

        {/* Map Pane */}
        <div className="w-full md:w-[60%] h-[40vh] md:h-auto">
          <MapView properties={data?.items || []} />
        </div>
      </div>
    </div>
  );
}
