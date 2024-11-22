import { IChangeCaseOptions } from "@interfaces/IChangeCase";

import { toCamelCase } from "./case-changers/toCamelCase";
import { toConstantCase } from "./case-changers/toConstantCase";
import { toDotCase } from "./case-changers/toDotCase";
import { toKebabCase } from "./case-changers/toKebabCase";
import { toLowerCase } from "./case-changers/toLowerCase";
import { toPascalCase } from "./case-changers/toPascalCase";
import { toSentenceCase } from "./case-changers/toSentenceCase";
import { toSnakeCase } from "./case-changers/toSnakeCase";
import { toStudlyCaps } from "./case-changers/toStudlyCaps";
import { toTitleCase } from "./case-changers/toTitleCase";
import { toTrainCase } from "./case-changers/toTrainCase";
import { toUpperCase } from "./case-changers/toUpperCase";

interface IFormatTextProps {
  input: string;
  caseType: string;
  options?: IChangeCaseOptions;
}

export const formatText = ({
  input,
  caseType,
  options,
}: IFormatTextProps): string => {
  switch (caseType) {
    case "Lower Case":
      return toLowerCase({ input, options });
    case "Upper Case":
      return toUpperCase({ input, options });
    case "Constant Case":
      return toConstantCase({ input, options });
    case "Camel Case":
      return toCamelCase({ input, options });
    case "Pascal Case":
      return toPascalCase({ input, options });
    case "Snake Case":
      return toSnakeCase({ input, options });
    case "Kebab Case":
      return toKebabCase({ input, options });
    case "Title Case":
      return toTitleCase({ input, options });
    case "Sentence Case":
      return toSentenceCase({ input, options });
    case "Train Case":
      return toTrainCase({ input, options });
    case "Dot Case":
      return toDotCase({ input, options });
    case "Screaming Snake Case":
      return toConstantCase({ input, options });
    case "Studly Caps":
      return toStudlyCaps({ input, options });
    default:
      throw new Error("You selected a non-existant Case");
  }
};
