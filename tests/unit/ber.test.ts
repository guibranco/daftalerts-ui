import { describe, it, expect } from 'vitest';
import { getBerColor, isBerBetterOrEqualTo } from '../../src/lib/ber';

describe('getBerColor', () => {
  it('returns gray for null', () => {
    expect(getBerColor(null)).toBe('bg-gray-400');
  });

  it('returns green for A ratings', () => {
    expect(getBerColor('A2')).toBe('bg-green-600');
  });

  it('returns appropriate colors for other ratings', () => {
    expect(getBerColor('B1')).toBe('bg-lime-500');
    expect(getBerColor('C3')).toBe('bg-yellow-500');
    expect(getBerColor('D1')).toBe('bg-orange-500');
    expect(getBerColor('E2')).toBe('bg-red-600');
    expect(getBerColor('Unknown')).toBe('bg-gray-400');
  });

  it('returns red for poor ratings', () => {
    expect(getBerColor('F')).toBe('bg-red-600');
    expect(getBerColor('G')).toBe('bg-red-600');
  });
});

describe('isBerBetterOrEqualTo', () => {
  it('returns true if minBer is Any', () => {
    expect(isBerBetterOrEqualTo('G', 'Any')).toBe(true);
    expect(isBerBetterOrEqualTo(null, 'Any')).toBe(true);
  });

  it('correctly compares ratings', () => {
    expect(isBerBetterOrEqualTo('A1', 'B2')).toBe(true);
    expect(isBerBetterOrEqualTo('B3', 'A1')).toBe(false);
    expect(isBerBetterOrEqualTo('C1', 'C3')).toBe(true);
    expect(isBerBetterOrEqualTo('G', 'A1')).toBe(false);
  });

  it('returns false if rating is missing but minBer is required', () => {
    expect(isBerBetterOrEqualTo(null, 'C1')).toBe(false);
  });
});
