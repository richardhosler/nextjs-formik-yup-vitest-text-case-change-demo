import * as changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toPascalCase } from "../toPascalCase";

describe("PascalCase tests", { concurrent: true }, () => {
  describe("using toPascalCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toPascalCase({input})).toBe(expected);
    });
  });
  describe("using toPascalCase with alphaNumeric", { concurrent: true }, () => {
    test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
      expect(toPascalCase({input, options:{ alphaNumeric: true }})).toBe(expected);
    });
  });
  describe("using toPascalCase with replace '_'", { concurrent: true }, () => {
    test.for(testData.replaced)("%s", ([input, expected]) => {
      expect(toPascalCase({input, options:{ alphaNumeric: true, replace: "_" }})).toBe(
        expected
      );
    });
  });
  describe(
    "using changeCase fails on special characters and punctuation",
    { concurrent: true },
    () => {
      test.fails.for(testData.unstripped.slice(1, 3))(
        "%s",
        ([input, expected]) => {
          expect(changeCase.pascalCase(input)).toBe(expected);
        }
      );
    }
  );
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "ThisTestStringOnlyContainsAlphabeticCharacters",
    ],
    [
      "This test string, contains punctuation.",
      "ThisTestString,ContainsPunctuation.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th!sTestStringCont@insSp£cialCharacters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1sTestStringC0ntainsJustAFewNumb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "ThisIsASentence.ThisIsAnotherSentence.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring\\looksabit\\likeapath\\witha.file",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "ThisTestStringOnlyContainsAlphabeticCharacters",
    ],
    [
      "This test string, contains punctuation.",
      "ThisTestStringContainsPunctuation",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "ThsTestStringContinsSpcialCharacters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1sTestStringC0ntainsJustAFewNumb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "ThisIsASentenceThisIsAnotherSentence",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststringlooksabitlikeapathwithafile",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "ThisTestStringOnlyContainsAlphabeticCharacters",
    ],
    [
      "This test string, contains punctuation.",
      "ThisTestString_ContainsPunctuation_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th_sTestStringCont_insSp_cialCharacters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1sTestStringC0ntainsJustAFewNumb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "ThisIsASentence_ThisIsAnotherSentence_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring_looksabit_likeapath_witha_file",
    ],
  ],
};
