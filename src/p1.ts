function formatString(input: string, toUpper?: boolean): string {
  if (toUpper === false) return input.toLowerCase();

  return input.toUpperCase();
}
