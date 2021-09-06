import { MyStringUtils } from './string';

export namespace MyArrayUtils {
  export function sortObjectsByKey<T extends { [k: string]: any }>(
    arr: T[],
    key: keyof T,
    cb: (strA: string, strB: string) => number = MyStringUtils.compareStringsAsc
  ): T[] {
    return arr.concat().sort((a, b) => cb(a[key], b[key]));
  }

  export function difference<T>(arrA: T[], arrB: T[]): T[] {
    return arrA.filter((x: T) => !arrB.includes(x));
  }
}
