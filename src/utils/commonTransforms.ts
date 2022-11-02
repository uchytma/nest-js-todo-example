/*
 *  if value type is boolean, return original value.
 *  if value type is string and contains text "true", return true.
 *  Otherwise, return false.
 */
export function transformToBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string' && value.toLowerCase() === 'true') return true;
  return false;
}

/*
 *  if value is null or empty (or whitechars only) string, return null.
 *  if value type is boolean, return original value.
 *  if value type is string and contains text "true", return true.
 *  Otherwise, return false.
 */
export function transformToNullableBoolean(value: any): boolean | null {
  if (value == null || (typeof value === 'string' && value.trim() === '')) return null;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string' && value.toLowerCase() === 'true') return true;
  return false;
}

/*
 *  If value is null or empty (or whitechars only) string, return null.
 *  If value type is string, return value.ToString().Trim().
 *  Otherwise, return null.
 */
export function transformToNullableString(value: any): string | null {
  if (value == null || (typeof value === 'string' && value.trim() === '')) return null;
  if (typeof value === 'string') return value.trim();
  return null;
}
