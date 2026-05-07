import { z } from 'zod';
import { PropertyStatus } from '../types/property';

export const PropertySchema = z.object({
  id: z.string().uuid(),
  daftId: z.string(),
  daftUrl: z.string().url(),
  address: z.string(),
  eircode: z.string().nullable(),
  routingKey: z.string().nullable(),
  priceMonthly: z.number(),
  currency: z.literal('EUR'),
  beds: z.number(),
  baths: z.number(),
  propertyType: z.string(),
  berRating: z.string().nullable(),
  mainImageUrl: z.string().url().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  status: z.enum(['inbox', 'approved', 'recycled'] as [PropertyStatus, ...PropertyStatus[]]),
  receivedAt: z.string().datetime(),
  approvedAt: z.string().datetime().nullable(),
  recycledAt: z.string().datetime().nullable(),
  notes: z.string().nullable(),
  rawSubject: z.string(),
});

export const PropertyListResponseSchema = z.object({
  items: z.array(PropertySchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const StatsSchema = z.object({
  inboxCount: z.number(),
  approvedCount: z.number(),
  recycledCount: z.number(),
  avgApprovedPrice: z.number(),
  medianApprovedPrice: z.number(),
});

export const FilterPresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  routingKeys: z.array(z.string()),
  minBeds: z.number().nullable(),
  maxBeds: z.number().nullable(),
  minBaths: z.number().nullable(),
  maxPrice: z.number().nullable(),
  minPrice: z.number().nullable(),
  propertyTypes: z.array(z.string()),
  berMin: z.string().nullable(),
  isDefault: z.boolean(),
});
