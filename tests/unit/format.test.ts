import { describe, it, expect, vi } from 'vitest';
import { formatPrice } from '../../src/lib/format';

// Mock i18next
vi.mock('../i18n', () => ({
  default: {
    language: 'en',
  },
}));

describe('formatPrice', () => {
  it('formats euro amounts correctly in English', () => {
    // We expect €1,234 as it's set to en-IE in the code for non-pt
    const result = formatPrice(1234);
    // Use a regex because Intl.NumberFormat might use different space characters
    expect(result).toMatch(/€\s?1,234/);
  });

  it('formats euro amounts correctly in Portuguese', async () => {
    // Change mock language
    const i18n = await import('../../src/i18n');
    (i18n.default.language as string) = 'pt';
    
    const result = formatPrice(1234);
    // pt-BR uses € 1.234 or similar
    expect(result).toMatch(/€\s?1\.234/);
  });
});
