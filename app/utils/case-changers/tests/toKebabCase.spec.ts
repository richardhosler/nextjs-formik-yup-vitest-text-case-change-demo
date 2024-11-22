import * as changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toKebabCase } from "../toKebabCase";

describe("kebab-case tests", { concurrent: true }, () => {
  describe("using toKebabCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toKebabCase({ input })).toBe(expected);
    });
  });
  describe("using toKebabCase with alphaNumeric", { concurrent: true }, () => {
    test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
      expect(toKebabCase({ input, options: { alphaNumeric: true } })).toBe(
        expected
      );
    });
  });
  describe("using toKebabCase with replace '_'", { concurrent: true }, () => {
    test.for(testData.replaced)("%s", ([input, expected]) => {
      expect(
        toKebabCase({ input, options: { alphaNumeric: true, replace: "_" } })
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
          expect(changeCase.kebabCase(input)).toBe(expected);
        }
      );
    }
  );
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "this-test-string-only-contains-alphabetic-characters",
    ],
    [
      "This test string, contains punctuation.",
      "this-test-string,-contains-punctuation.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "th!s-test-string-cont@ins-sp£cial-characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1s-test-string-c0ntains-just-a-few-numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "this-is-a-sentence.-this-is-another-sentence.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststring\\looksabit\\likeapath\\witha.file",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "this-test-string-only-contains-alphabetic-characters",
    ],
    [
      "This test string, contains punctuation.",
      "this-test-string-contains-punctuation",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "ths-test-string-contins-spcial-characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1s-test-string-c0ntains-just-a-few-numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "this-is-a-sentence-this-is-another-sentence",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststringlooksabitlikeapathwithafile",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "this-test-string-only-contains-alphabetic-characters",
    ],
    [
      "This test string, contains punctuation.",
      "this-test-string_-contains-punctuation_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "th_s-test-string-cont_ins-sp_cial-characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1s-test-string-c0ntains-just-a-few-numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "this-is-a-sentence_-this-is-another-sentence_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststring_looksabit_likeapath_witha_file",
    ],
  ],
};
