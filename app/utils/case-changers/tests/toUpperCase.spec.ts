import { describe, expect, test } from "vitest";

import { toUpperCase } from "../toUpperCase";

describe("Upper Case tests", { concurrent: true }, () => {
  describe("using toUpperCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toUpperCase({input})).toBe(expected);
    });
  });
  describe("using toUpperCase with alphaNumeric", { concurrent: true }, () => {
    test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
      expect(toUpperCase({input, options:{ alphaNumeric: true }})).toBe(expected);
    });
  });
  describe("using toUpperCase with replace '_'", { concurrent: true }, () => {
    test.for(testData.replaced)("%s", ([input, expected]) => {
      expect(toUpperCase({input, options:{ alphaNumeric: true, replace: "_" }})).toBe(
        expected
      );
    });
  });
  describe("using built-in", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(input.toUpperCase()).toBe(expected);
    });
  });
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "THIS TEST STRING ONLY CONTAINS ALPHABETIC CHARACTERS",
    ],
    [
      "This test string, contains punctuation.",
      "THIS TEST STRING, CONTAINS PUNCTUATION.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "TH!S TEST STRING CONT@INS SP£CIAL CHARACTERS",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "TH1S TEST STRING C0NTAINS JUST A FEW NUMB3RS",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "THIS IS A SENTENCE. THIS IS ANOTHER SENTENCE.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "THISTESTSTRING\\LOOKSABIT\\LIKEAPATH\\WITHA.FILE",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "THIS TEST STRING ONLY CONTAINS ALPHABETIC CHARACTERS",
    ],
    [
      "This test string, contains punctuation.",
      "THIS TEST STRING CONTAINS PUNCTUATION",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "THS TEST STRING CONTINS SPCIAL CHARACTERS",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "TH1S TEST STRING C0NTAINS JUST A FEW NUMB3RS",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "THIS IS A SENTENCE THIS IS ANOTHER SENTENCE",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "THISTESTSTRINGLOOKSABITLIKEAPATHWITHAFILE",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "THIS TEST STRING ONLY CONTAINS ALPHABETIC CHARACTERS",
    ],
    [
      "This test string, contains punctuation.",
      "THIS TEST STRING_ CONTAINS PUNCTUATION_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "TH_S TEST STRING CONT_INS SP_CIAL CHARACTERS",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "TH1S TEST STRING C0NTAINS JUST A FEW NUMB3RS",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "THIS IS A SENTENCE_ THIS IS ANOTHER SENTENCE_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "THISTESTSTRING_LOOKSABIT_LIKEAPATH_WITHA_FILE",
    ],
  ],
};
