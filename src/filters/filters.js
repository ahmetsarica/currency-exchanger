export function uppercase(str) {
  return str.toUpperCase();
}

export function formatFixedDecimal(value) {
  const numValue = typeof value === 'string' ? parseFloat(value) : value; // Ensure Number
  return numValue.toFixed(2); // Two decimal places
}
