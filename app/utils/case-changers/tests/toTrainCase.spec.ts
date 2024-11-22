import * as changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toTrainCase } from "../toTrainCase";

describe("Train_Case tests", { concurrent: true }, () => {
  describe("using toTrainCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toTrainCase({input})).toBe(expected);
    });
  });
  describe("using toTrainCase with alphaNumeric", { concurrent: true }, () => {
    test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
      expect(toTrainCase({input, options:{ alphaNumeric: true }})).toBe(expected);
    });
  });
  describe("using toTrainCase with replace '_'", { concurrent: true }, () => {
    test.for(testData.replaced)("%s", ([input, expected]) => {
      expect(toTrainCase({input, options:{ alphaNumeric: true, replace: "_" }})).toBe(
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
          expect(changeCase.trainCase(input)).toBe(expected);
        }
      );
    }
  );
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "This_Test_String_Only_Contains_Alphabetic_Characters",
    ],
    [
      "This test string, contains punctuation.",
      "This_Test_String,_Contains_Punctuation.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th!s_Test_String_Cont@ins_Sp£cial_Characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s_Test_String_C0ntains_Just_A_Few_Numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This_Is_A_Sentence._This_Is_Another_Sentence.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring\\looksabit\\likeapath\\witha.file",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "This_Test_String_Only_Contains_Alphabetic_Characters",
    ],
    [
      "This test string, contains punctuation.",
      "This_Test_String_Contains_Punctuation",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Ths_Test_String_Contins_Spcial_Characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s_Test_String_C0ntains_Just_A_Few_Numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This_Is_A_Sentence_This_Is_Another_Sentence",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststringlooksabitlikeapathwithafile",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "This_Test_String_Only_Contains_Alphabetic_Characters",
    ],
    [
      "This test string, contains punctuation.",
      "This_Test_String__Contains_Punctuation_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "Th_s_Test_String_Cont_ins_Sp_cial_Characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "Th1s_Test_String_C0ntains_Just_A_Few_Numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "This_Is_A_Sentence__This_Is_Another_Sentence_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "Thisteststring_looksabit_likeapath_witha_file",
    ],
  ],
};
