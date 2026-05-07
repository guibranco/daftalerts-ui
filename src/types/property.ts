export type PropertyStatus = 'inbox' | 'approved' | 'recycled';

export interface Property {
  id: string;                    // backend UUID
  daftId: string;                // e.g. "6546017"
  daftUrl: string;               // full listing URL
  address: string;               // "Herbert Lane Mews, Dublin 2, D02KC86"
  eircode: string | null;        // "D02KC86"
  routingKey: string | null;     // "D02" (first 3 chars of eircode)
  priceMonthly: number;          // 2850 (euros)
  currency: 'EUR';
  beds: number;
  baths: number;
  propertyType: string;          // "House", "Apartment", "Studio", "Shared"
  berRating: string | null;      // "C3", "A2", "Exempt", null
  mainImageUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  status: PropertyStatus;
  receivedAt: string;            // ISO datetime
  approvedAt: string | null;
  recycledAt: string | null;
  notes: string | null;          // user's private notes
  rawSubject: string;            // original email subject
}

export interface Stats {
  inboxCount: number;
  approvedCount: number;
  recycledCount: number;
  avgApprovedPrice: number;
  medianApprovedPrice: number;
}
