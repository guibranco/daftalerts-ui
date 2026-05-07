import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/apiClient';
import { Property, PropertyStatus } from '../types/property';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export function useProperties(status: PropertyStatus, filters: any) {
  return useQuery({
    queryKey: ['properties', status, filters],
    queryKeyHashFn: (queryKey) => JSON.stringify(queryKey),
    queryFn: () => apiClient.getProperties({ status, ...filters }),
    refetchInterval: 60000, // Auto-refetch every 60s
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => apiClient.getProperty(id),
    enabled: !!id,
  });
}

export function usePropertyMutations() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const bulkMutation = useMutation({
    mutationFn: ({ ids, action }: { ids: string[], action: 'approve' | 'recycle' | 'restore' }) => 
      apiClient.bulkAction(ids, action),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      
      const message = variables.action === 'approve' ? t('inbox.movedToApproved') : t('inbox.movedToRecycled');
      
      toast.success(message, {
        action: {
          label: t('common.undo'),
          onClick: () => {
            // Logic for undo - restore previously changed ids
            const undoAction = variables.action === 'restore' ? 'recycle' : 'restore';
            apiClient.bulkAction(variables.ids, undoAction as any).then(() => {
              queryClient.invalidateQueries({ queryKey: ['properties'] });
              queryClient.invalidateQueries({ queryKey: ['stats'] });
            });
          }
        }
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Property> }) => 
      apiClient.updateProperty(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['property', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    }
  });

  return { bulkMutation, updateMutation };
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: apiClient.getStats,
    refetchInterval: 60000,
  });
}
