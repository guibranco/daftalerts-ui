export interface FilterPreset {
  id: string;
  name: string;
  routingKeys: string[];         // ["D01","D02","D06","D08"]
  minBeds: number | null;
  maxBeds: number | null;
  minBaths: number | null;
  maxPrice: number | null;
  minPrice: number | null;
  propertyTypes: string[];       // [] means all
  berMin: string | null;         // "C3" means C3 or better
  isDefault: boolean;
}
