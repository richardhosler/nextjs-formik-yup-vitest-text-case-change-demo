import { IChangeCase } from "@interfaces/IChangeCase";
import { toAlphaNumeric } from "../toAlphaNumeric";

export const toSnakeCase = ({ input, options }: IChangeCase): string => {
  if (options?.alphaNumeric) {
    input = toAlphaNumeric(input, options.replace);
  }

  const words = input.split(/\s+/);

  const casedWords = words.map((word) => word.toLowerCase());

  return casedWords.join("_");
};
