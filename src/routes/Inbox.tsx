import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProperties, usePropertyMutations } from '../hooks/useProperties';
import { useFilters } from '../hooks/useFilters';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyCardSkeleton } from '../components/PropertyCardSkeleton';
import { FilterSheet } from '../components/FilterSheet';
import { FilterChips } from '../components/FilterChips';
import { Button } from '../components/ui/button';
import { 
  LayoutGrid, 
  List, 
  RotateCcw,
  Save,
  PackageOpen
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { usePresets } from '../hooks/usePresets';
import { AnimatePresence, motion } from 'motion/react';

export default function Inbox() {
  const { t } = useTranslation();
  const { filters, setFilter, clearFilters } = useFilters();
  const { data, isLoading } = useProperties('inbox', filters);
  const { bulkMutation } = usePropertyMutations();
  const { query: presetsQuery } = usePresets();

  const handleApprove = (id: string) => {
    bulkMutation.mutate({ ids: [id], action: 'approve' });
  };

  const handleRecycle = (id: string) => {
    bulkMutation.mutate({ ids: [id], action: 'recycle' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-semibold tracking-tight">{t('inbox.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('inbox.empty').split('.')[1]}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select 
            value={filters.view} 
            onValueChange={(v) => setFilter('view', v)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  {t('inbox.gridView')}
                </div>
              </SelectItem>
              <SelectItem value="list">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  {t('inbox.listView')}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.sortBy} 
            onValueChange={(v) => setFilter('sortBy', v)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="receivedAt">Latest</SelectItem>
              <SelectItem value="priceMonthly">Price</SelectItem>
              <SelectItem value="beds">Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 bg-card p-2 rounded-xl border shadow-sm">
        <FilterSheet />
        
        <Select 
          onValueChange={(id) => {
            const preset = presetsQuery.data?.find(p => p.id === id);
            if (preset) {
               // Update filters from preset
            }
          }}
        >
          <SelectTrigger className="w-40 h-9">
            <SelectValue placeholder={t('inbox.preset')} />
          </SelectTrigger>
          <SelectContent>
             {presetsQuery.data?.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
             ))}
          </SelectContent>
        </Select>

        <Button variant="ghost" size="sm" className="h-9 gap-2" onClick={clearFilters}>
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">{t('inbox.clearFilters')}</span>
        </Button>
      </div>

      <FilterChips />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : data?.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
            <PackageOpen className="w-10 h-10 text-primary opacity-20" />
          </div>
          <p className="text-xl font-medium text-muted-foreground max-w-xs">
            {t('inbox.empty')}
          </p>
        </div>
      ) : (
        <div className={filters.view === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" 
          : "space-y-3"
        }>
          <AnimatePresence mode="popLayout">
            {data?.items.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <PropertyCard 
                  property={property} 
                  onApprove={handleApprove}
                  onRecycle={handleRecycle}
                  view={filters.view as 'grid' | 'list'}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
