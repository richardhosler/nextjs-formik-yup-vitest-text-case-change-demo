export const toAlphaNumeric = (input: string, replace?: string): string =>
  replace !== undefined
    ? input.replaceAll(/[^a-zA-Z0-9\s]/g, replace)
    : input.replaceAll(/[^a-zA-Z0-9\s]/g, "");
