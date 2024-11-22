import * as changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toCamelCase } from "../toCamelCase";

describe("camelCase", { concurrent: true }, () => {
  describe("using toCamelCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toCamelCase({ input })).toBe(expected);
    });
  });
  describe("using toCamelCase with alphaNumeric", { concurrent: true }, () => {
    test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
      expect(toCamelCase({ input, options: { alphaNumeric: true } })).toBe(
        expected
      );
    });
  });
  describe("using toCamelCase with replace '_'", { concurrent: true }, () => {
    test.for(testData.replaced)("%s", ([input, expected]) => {
      expect(
        toCamelCase({ input, options: { alphaNumeric: true, replace: "_" } })
      ).toBe(expected);
    });
  });
  describe(
    "using changeCase fails on special characters and punctuation",
    { concurrent: true },
    () => {
      test.fails.for(testData.unstripped.slice(1, 3))(
        "%s",
        ([input, expected]) => {
          expect(changeCase.camelCase(input)).toBe(expected);
        }
      );
    }
  );
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "thisTestStringOnlyContainsAlphabeticCharacters",
    ],
    [
      "This test string, contains punctuation.",
      "thisTestString,ContainsPunctuation.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "th!sTestStringCont@insSp£cialCharacters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1sTestStringC0ntainsJustAFewNumb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "thisIsASentence.ThisIsAnotherSentence.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststring\\looksabit\\likeapath\\witha.file",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "thisTestStringOnlyContainsAlphabeticCharacters",
    ],
    [
      "This test string, contains punctuation.",
      "thisTestStringContainsPunctuation",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "thsTestStringContinsSpcialCharacters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1sTestStringC0ntainsJustAFewNumb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "thisIsASentenceThisIsAnotherSentence",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststringlooksabitlikeapathwithafile",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "thisTestStringOnlyContainsAlphabeticCharacters",
    ],
    [
      "This test string, contains punctuation.",
      "thisTestString_ContainsPunctuation_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "th_sTestStringCont_insSp_cialCharacters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1sTestStringC0ntainsJustAFewNumb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "thisIsASentence_ThisIsAnotherSentence_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststring_looksabit_likeapath_witha_file",
    ],
  ],
};
