import { z } from 'zod';
import { Property, PropertyStatus, Stats } from '../types/property';
import { FilterPreset } from '../types/preset';
import { PropertyListResponseSchema, PropertySchema, StatsSchema, FilterPresetSchema } from './schemas';
import { mockProperties, mockPresets } from './mockData';

const getApiConfig = () => {
  const baseUrl = localStorage.getItem('daft_api_base_url');
  const token = localStorage.getItem('daft_api_token');
  return { baseUrl, token };
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options: RequestInit = {}, schema?: any): Promise<T> {
  const { baseUrl, token } = getApiConfig();
  const isMock = !baseUrl || !token;

  if (isMock) {
    return handleMockRequest<T>(path, options);
  }

  const url = `${baseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || response.statusText);
  }

  const data = await response.json();
  
  if (schema) {
    return schema.parse(data);
  }
  
  return data as T;
}

// Simple mock handler for development
async function handleMockRequest<T>(path: string, options: RequestInit): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

  if (path.startsWith('/api/properties')) {
    if (path.includes('/') && path.split('/').length === 4) { // /api/properties/{id}
      const id = path.split('/').pop();
      const prop = mockProperties.find(p => p.id === id);
      if (!prop) throw new ApiError(404, 'Not found');
      return prop as T;
    }
    
    // List / Search
    const url = new URL(path, 'http://localhost');
    const status = url.searchParams.get('status') as PropertyStatus;
    const search = url.searchParams.get('search')?.toLowerCase();
    
    let filtered = mockProperties.filter(p => !status || p.status === status);
    
    if (search) {
      filtered = filtered.filter(p => 
        p.address.toLowerCase().includes(search) || 
        p.daftId.includes(search)
      );
    }
    
    return {
      items: filtered,
      total: filtered.length,
      page: 1,
      pageSize: 50
    } as T;
  }

  if (path === '/api/stats') {
    const approved = mockProperties.filter(p => p.status === 'approved');
    const prices = approved.map(p => p.priceMonthly).sort((a, b) => a - b);
    const median = prices.length ? prices[Math.floor(prices.length / 2)] : 0;
    const avg = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    
    return {
      inboxCount: mockProperties.filter(p => p.status === 'inbox').length,
      approvedCount: approved.length,
      recycledCount: mockProperties.filter(p => p.status === 'recycled').length,
      avgApprovedPrice: avg,
      medianApprovedPrice: median
    } as T;
  }

  if (path === '/api/presets') {
    return mockPresets as T;
  }

  throw new ApiError(404, 'Not found');
}

export const apiClient = {
  getProperties: (params: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value.toString());
      }
    });
    return request<{ items: Property[]; total: number; page: number; pageSize: number }>(`/api/properties?${searchParams.toString()}`);
  },
  
  getProperty: (id: string) => request<Property>(`/api/properties/${id}`, {}, PropertySchema),
  
  updateProperty: (id: string, body: Partial<Property>) => request<Property>(`/api/properties/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  }, PropertySchema),
  
  bulkAction: (ids: string[], action: 'approve' | 'recycle' | 'restore') => request<void>(`/api/properties/bulk`, {
    method: 'POST',
    body: JSON.stringify({ ids, action }),
  }),
  
  getStats: () => request<Stats>(`/api/stats`, {}, StatsSchema),
  
  getPresets: () => request<FilterPreset[]>(`/api/presets`, {}, z.array(FilterPresetSchema)),
  
  createPreset: (preset: Omit<FilterPreset, 'id'>) => request<FilterPreset>(`/api/presets`, {
    method: 'POST',
    body: JSON.stringify(preset),
  }, FilterPresetSchema),
  
  updatePreset: (id: string, preset: Partial<FilterPreset>) => request<FilterPreset>(`/api/presets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(preset),
  }, FilterPresetSchema),
  
  deletePreset: (id: string) => request<void>(`/api/presets/${id}`, { method: 'DELETE' }),
};
