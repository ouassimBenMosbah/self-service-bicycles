export function compareStrings(stringA: string, stringB: string): number {
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
