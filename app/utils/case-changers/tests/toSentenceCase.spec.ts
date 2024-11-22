import * as changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toSentenceCase } from "../toSentenceCase";

describe("Sentence case tests", { concurrent: true }, () => {
  describe("using toSentenceCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toSentenceCase({ input })).toBe(expected);
    });
  });
  describe(
    "using toSentenceCase with alphaNumeric",
    { concurrent: true },
    () => {
      test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
        expect(toSentenceCase({ input, options: { alphaNumeric: true } })).toBe(
          expected
        );
      });
    }
  );
  describe(
    "using toSentenceCase with replace '_'",
    { concurrent: true },
    () => {
      test.for(testData.replaced)("%s", ([input, expected]) => {
        expect(
          toSentenceCase({
            input,
            options: { alphaNumeric: true, replace: "_" },
          })
        ).toBe(expected);
      });
    }
  );
  describe(
    "using changeCase fails on special characters, punctuation and multiple sentences.",
    { concurrent: true },
    () => {
      test.fails.for(testData.unstripped.slice(1, 3))(
        "%s",
        ([input, expected]) => {
          expect(changeCase.sentenceCase(input)).toBe(expected);
        }
      );
      test.fails.for(testData.unstripped.slice(4, 5))(
        "%s",
        ([input, expected]) => {
          expect(changeCase.sentenceCase(input)).toBe(expected);
        }
      );
    }
  );
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "This test string only contains alphabetic characters.",
    ],
    [
      "This test string, contains punctuation.",
      "This test string, contains punctuation.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th!s test string cont@ins sp£cial characters.",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s test string c0ntains just a few numb3rs.",
    ],
    [
      "This is a sentence. This is, ANOTHER sentence.",
      "This is a sentence. This is, another sentence.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring\\looksabit\\likeapath\\witha.file.",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "This test string only contains alphabetic characters",
    ],
    [
      "This test string, contains punctuation.",
      "This test string contains punctuation",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Ths test string contins spcial characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s test string c0ntains just a few numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This is a sentence this is another sentence",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststringlooksabitlikeapathwithafile",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "This test string only contains alphabetic characters",
    ],
    [
      "This test string, contains punctuation.",
      "This test string_ contains punctuation_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th_s test string cont_ins sp_cial characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s test string c0ntains just a few numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This is a sentence_ this is another sentence_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring_looksabit_likeapath_witha_file",
    ],
  ],
};
