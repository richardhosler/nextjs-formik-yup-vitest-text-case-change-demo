import { IChangeCase } from "@interfaces/IChangeCase";
import { toAlphaNumeric } from "../toAlphaNumeric";

export const toTitleCase = ({ input, options }: IChangeCase): string => {
  if (options?.alphaNumeric) {
    input = toAlphaNumeric(input, options?.replace);
  }

  const words = input.split(/\s+/);

  const casedWords = words.map((word) => {
    if (stopWords.includes(word)) {
      return word;
    }
    const code = word.charCodeAt(0);
    return code >= 0x61 && code <= 0x7a
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word.charAt(0) + word.slice(1).toLowerCase();
  });

  return casedWords.join(" ");
};

const stopWords = [
  "a",
  "is",
  "the",
  "of",
  "as",
  "an",
  "and",
  "in",
  "to",
  "for",
  "on",
  "at",
  "by",
  "or",
];
