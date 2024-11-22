import { IChangeCase } from "@interfaces/IChangeCase";
import { toAlphaNumeric } from "../toAlphaNumeric";

export const toTrainCase = ({ input, options }: IChangeCase): string => {
  if (options?.alphaNumeric) {
    input = toAlphaNumeric(input, options.replace);
  }

  const words = input.split(/\s+/);

  const cased = words.map((word) => {
    const code = word.charCodeAt(0);
    return code >= 0x61 && code <= 0x7a
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word.charAt(0) + word.slice(1).toLowerCase();
  });
  return cased.join("_");
};
