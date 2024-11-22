import { IChangeCase } from "@interfaces/IChangeCase";
import { toAlphaNumeric } from "../toAlphaNumeric";

export const toStudlyCaps = ({ input, options }: IChangeCase): string => {
  if (options?.alphaNumeric) {
    input = toAlphaNumeric(input, options?.replace);
  }
  return input
  .split("")
  .map((char, i) =>
    i % Math.round(Math.random() * 2) === 0
      ? char.toUpperCase()
      : char.toLowerCase()
  )
  .join("");
};
