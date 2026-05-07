import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/apiClient';
import { FilterPreset } from '../types/preset';

export function usePresets() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['presets'],
    queryFn: apiClient.getPresets,
  });

  const createMutation = useMutation({
    mutationFn: (preset: Omit<FilterPreset, 'id'>) => apiClient.createPreset(preset),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['presets'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, preset }: { id: string, preset: Partial<FilterPreset> }) => 
      apiClient.updatePreset(id, preset),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['presets'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.deletePreset(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['presets'] }),
  });

  return { query, createMutation, updateMutation, deleteMutation };
}
