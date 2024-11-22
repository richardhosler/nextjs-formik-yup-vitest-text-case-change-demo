import * as changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toTitleCase } from "../toTitleCase";

describe("Title Case tests", { concurrent: true }, () => {
  describe("using toTitleCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toTitleCase({input})).toBe(expected);
    });
  });
  describe("using toTitleCase with alphaNumeric", { concurrent: true }, () => {
    test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
      expect(toTitleCase({input, options:{ alphaNumeric: true }})).toBe(expected);
    });
  });
  describe("using toTitleCase with replace '_'", { concurrent: true }, () => {
    test.for(testData.replaced)("%s", ([input, expected]) => {
      expect(toTitleCase({input, options:{ alphaNumeric: true, replace: "_" }})).toBe(
        expected
      );
    });
  });
  describe("using changeCase only passes test 1", { concurrent: true }, () => {
    test.fails.for(testData.unstripped.slice(1))("%s", ([input, expected]) => {
      expect(changeCase.capitalCase(input)).toBe(expected);
    });
  });
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "This Test String Only Contains Alphabetic Characters",
    ],
    [
      "This test string, contains punctuation.",
      "This Test String, Contains Punctuation.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th!s Test String Cont@ins Sp£cial Characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s Test String C0ntains Just a Few Numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This is a Sentence. This is Another Sentence.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring\\looksabit\\likeapath\\witha.file",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "This Test String Only Contains Alphabetic Characters",
    ],
    [
      "This test string, contains punctuation.",
      "This Test String Contains Punctuation",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Ths Test String Contins Spcial Characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s Test String C0ntains Just a Few Numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This is a Sentence This is Another Sentence",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststringlooksabitlikeapathwithafile",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "This Test String Only Contains Alphabetic Characters",
    ],
    [
      "This test string, contains punctuation.",
      "This Test String_ Contains Punctuation_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th_s Test String Cont_ins Sp_cial Characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s Test String C0ntains Just a Few Numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This is a Sentence_ This is Another Sentence_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring_looksabit_likeapath_witha_file",
    ],
  ],
};
