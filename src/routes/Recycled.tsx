import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProperties, usePropertyMutations } from '../hooks/useProperties';
import { useFilters } from '../hooks/useFilters';
import { PropertyCard } from '../components/PropertyCard';
import { FilterSheet } from '../components/FilterSheet';
import { FilterChips } from '../components/FilterChips';
import { PropertyCardSkeleton } from '../components/PropertyCardSkeleton';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from '../components/ui/input';

export default function Recycled() {
  const { t } = useTranslation();
  const { filters } = useFilters();
  const { data, isLoading } = useProperties('recycled', filters);
  const { bulkMutation } = usePropertyMutations();
  const [confirmDelete, setConfirmDelete] = React.useState("");

  const handleRestore = (id: string) => {
    bulkMutation.mutate({ ids: [id], action: 'restore' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight">{t('nav.recycled')}</h1>
         
         <Dialog>
            <DialogTrigger render={<Button variant="destructive" size="sm" className="gap-2" />}>
              <Trash2 className="w-4 h-4" />
              Empty Recycle Bin
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete all properties in your recycle bin.
                  Please type <strong>DELETE</strong> to confirm.
                </DialogDescription>
              </DialogHeader>
              <Input 
                value={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.value)}
                placeholder="DELETE"
              />
              <DialogFooter>
                <Button 
                  variant="destructive" 
                  disabled={confirmDelete !== "DELETE"}
                  onClick={() => {
                    // Bulk delete logic
                  }}
                >
                  Confirm Permanent Deletion
                </Button>
              </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>

      <div className="flex flex-wrap items-center gap-2 bg-card p-2 rounded-xl border shadow-sm">
        <FilterSheet />
        <FilterChips />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {data?.items.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="transition-opacity hover:opacity-100"
              >
                <PropertyCard 
                  property={property} 
                  onRestore={handleRestore}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
