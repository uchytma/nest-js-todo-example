import { BadRequestException } from '@nestjs/common';

/**
 *  if value is null or empty (or whitechars only) string, return null.
 *  if value type is boolean, return original value.
 *  if value type is string and contains text "true", return true.
 *  Otherwise, throw BadRequestException.
 *
 *  @throws {BadRequestException}
 */
export function transformToNullableBoolean(value: any): boolean | null {
  if (value == null || (typeof value === 'string' && value.trim() === '')) return null;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string' && value.toLowerCase() === 'true') return true;
  if (typeof value === 'string' && value.toLowerCase() === 'false') return false;
  throw new BadRequestException('Invalid boolean value');
}
