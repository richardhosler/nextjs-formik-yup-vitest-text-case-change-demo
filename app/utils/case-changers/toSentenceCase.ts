import { IChangeCase } from "@interfaces/IChangeCase";
import { toAlphaNumeric } from "../toAlphaNumeric";

export const toSentenceCase = ({ input, options }: IChangeCase): string => {
  if (options?.alphaNumeric) {
    input = toAlphaNumeric(input, options.replace);
  }

  const sentences = input.split(". ");

  const casedSentences = sentences.map((sentence) => {
    const trimmedSentence = sentence.trim();
    if (trimmedSentence.length === 0) {
      return "";
    }
    return (
      trimmedSentence.charAt(0).toUpperCase() +
      trimmedSentence.slice(1).toLowerCase()
    );
  });
  let out = casedSentences.join(". ").trim();
  if (out[out.length - 1] !== "." && !options?.alphaNumeric) {
    out = `${out}.`;
  }
  return out;
};
