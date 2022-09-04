import { uppercase, formatFixedDecimal } from '@/filters/filters';

describe('uppercase string', () => {
  it('uppercase', () => {
    expect(uppercase('abc')).toBe('ABC');
  });
});

describe('format input with 2 decimal points', () => {
  it('formatFixedDecimal', () => {
    expect(formatFixedDecimal('1')).toBe('1.00');
    expect(formatFixedDecimal('1.00')).toBe('1.00');
    expect(formatFixedDecimal('1.119999')).toBe('1.12');
    expect(formatFixedDecimal(1)).toBe('1.00');
    expect(formatFixedDecimal(1.0)).toBe('1.00');
    expect(formatFixedDecimal(1.119999)).toBe('1.12');
  });
});
