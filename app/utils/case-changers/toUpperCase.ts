import { IChangeCase } from "@interfaces/IChangeCase";
import { toAlphaNumeric } from "../toAlphaNumeric";

export const toUpperCase = ({ input, options }: IChangeCase): string => {
  if (options?.alphaNumeric) {
    input = toAlphaNumeric(input, options.replace);
  }
  return input.toUpperCase();
};
