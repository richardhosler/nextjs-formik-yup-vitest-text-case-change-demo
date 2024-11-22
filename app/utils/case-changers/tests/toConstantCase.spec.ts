import changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toConstantCase } from "../toConstantCase";

describe("CONSTANT_CASE tests", { concurrent: true }, () => {
  describe("using toConstantCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toConstantCase({input})).toBe(expected);
    });
  });
  describe(
    "using toConstantCase with alphaNumeric",
    { concurrent: true },
    () => {
      test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
        expect(toConstantCase({input, options:{ alphaNumeric: true }})).toBe(expected);
      });
    }
  );
  describe(
    "using toConstantCase with replace '_'",
    { concurrent: true },
    () => {
      test.for(testData.replaced)("%s", ([input, expected]) => {
        expect(
          toConstantCase({input, options:{ alphaNumeric: true, replace: "_" }})
        ).toBe(expected);
      });
    }
  );
  describe(
    "using changeCase fails on special characters and punctuation",
    { concurrent: true },
    () => {
      test.fails.for(testData.unstripped.slice(1, 3))(
        "%s",
        ([input, expected]) => {
          expect(changeCase.constantCase(input)).toBe(expected);
        }
      );
    }
  );
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "THIS_TEST_STRING_ONLY_CONTAINS_ALPHABETIC_CHARACTERS",
    ],
    [
      "This test string, contains punctuation.",
      "THIS_TEST_STRING,_CONTAINS_PUNCTUATION.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "TH!S_TEST_STRING_CONT@INS_SP£CIAL_CHARACTERS",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "TH1S_TEST_STRING_C0NTAINS_JUST_A_FEW_NUMB3RS",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "THIS_IS_A_SENTENCE._THIS_IS_ANOTHER_SENTENCE.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "THISTESTSTRING\\LOOKSABIT\\LIKEAPATH\\WITHA.FILE",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "THIS_TEST_STRING_ONLY_CONTAINS_ALPHABETIC_CHARACTERS",
    ],
    [
      "This test string, contains punctuation.",
      "THIS_TEST_STRING_CONTAINS_PUNCTUATION",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "THS_TEST_STRING_CONTINS_SPCIAL_CHARACTERS",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "TH1S_TEST_STRING_C0NTAINS_JUST_A_FEW_NUMB3RS",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "THIS_IS_A_SENTENCE_THIS_IS_ANOTHER_SENTENCE",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "THISTESTSTRINGLOOKSABITLIKEAPATHWITHAFILE",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "THIS_TEST_STRING_ONLY_CONTAINS_ALPHABETIC_CHARACTERS",
    ],
    [
      "This test string, contains punctuation.",
      "THIS_TEST_STRING__CONTAINS_PUNCTUATION_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "TH_S_TEST_STRING_CONT_INS_SP_CIAL_CHARACTERS",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "TH1S_TEST_STRING_C0NTAINS_JUST_A_FEW_NUMB3RS",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "THIS_IS_A_SENTENCE__THIS_IS_ANOTHER_SENTENCE_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "THISTESTSTRING_LOOKSABIT_LIKEAPATH_WITHA_FILE",
    ],
  ],
};
