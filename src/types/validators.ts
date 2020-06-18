import DateTime from './date';

export function getField<T>(value: T, field: string): T {
  if (value === null || value === undefined) {
    throw new Error(`${field} is required`);
  }
  return value;
}

export function isDate(value: DateTime): value is DateTime {
  return value instanceof DateTime && value.isValid;
}
