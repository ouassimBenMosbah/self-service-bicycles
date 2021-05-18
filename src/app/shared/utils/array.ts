import { compareStrings } from './string';

export function sortObjectsByKey<T extends { [k: string]: any }>(
  arr: T[],
  key: keyof T,
  cb: (strA: string, strB: string) => number = compareStrings
): T[] {
  return arr.sort((a, b) => cb(a[key], b[key]));
}
