export namespace MyStringUtils {
  export function compareStringsAsc(stringA: string, stringB: string): number {
    const comparison: number = stringA.localeCompare(stringB, 'en', {
      sensitivity: 'base',
    });
    if (comparison > 0) {
      return 1;
    } else if (comparison < 0) {
      return -1;
    } else {
      return 0;
    }
  }
  export function compareStringsDesc(stringA: string, stringB: string): number {
    const comparison: number = stringA.localeCompare(stringB, 'en', {
      sensitivity: 'base',
    });
    if (comparison > 0) {
      return -1;
    } else if (comparison < 0) {
      return 1;
    } else {
      return 0;
    }
  }

  export function isContaining(str: string, subString: string): boolean {
    return foldAccent(str.toLocaleLowerCase()).includes(foldAccent(subString.toLocaleLowerCase()));
  }

  function foldAccent(str: string): string {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  }
}
