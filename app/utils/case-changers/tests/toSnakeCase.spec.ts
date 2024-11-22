import * as changeCase from "change-case";
import { describe, expect, test } from "vitest";

import { toSnakeCase } from "../toSnakeCase";

describe("snake_case tests", { concurrent: true }, () => {
  describe("using toSnakeCase", { concurrent: true }, () => {
    test.for(testData.unstripped)("%s", ([input, expected]) => {
      expect(toSnakeCase({input})).toBe(expected);
    });
  });
  describe("using toSnakeCase with alphaNumeric", { concurrent: true }, () => {
    test.for(testData.alphaNumeric)("%s", ([input, expected]) => {
      expect(toSnakeCase({input, options:{ alphaNumeric: true }})).toBe(expected);
    });
  });
  describe("using toSnakeCase with replace '_'", { concurrent: true }, () => {
    test.for(testData.replaced)("%s", ([input, expected]) => {
      expect(toSnakeCase({input, options:{ alphaNumeric: true, replace: "_" }})).toBe(
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
          expect(changeCase.snakeCase(input)).toBe(expected);
        }
      );
    }
  );
});

const testData = {
  unstripped: [
    [
      "This test string ONLY contains alphabetic characters",
      "this_test_string_only_contains_alphabetic_characters",
    ],
    [
      "This test string, contains punctuation.",
      "this_test_string,_contains_punctuation.",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "th!s_test_string_cont@ins_sp£cial_characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1s_test_string_c0ntains_just_a_few_numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "this_is_a_sentence._this_is_another_sentence.",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststring\\looksabit\\likeapath\\witha.file",
    ],
  ],
  alphaNumeric: [
    [
      "This test string ONLY contains alphabetic characters",
      "this_test_string_only_contains_alphabetic_characters",
    ],
    [
      "This test string, contains punctuation.",
      "this_test_string_contains_punctuation",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "ths_test_string_contins_spcial_characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1s_test_string_c0ntains_just_a_few_numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "this_is_a_sentence_this_is_another_sentence",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststringlooksabitlikeapathwithafile",
    ],
  ],
  replaced: [
    [
      "This test string ONLY contains alphabetic characters",
      "this_test_string_only_contains_alphabetic_characters",
    ],
    [
      "This test string, contains punctuation.",
      "this_test_string__contains_punctuation_",
    ],
    [
      "Th!s test string cont@ins sp£cial characters",
      "th_s_test_string_cont_ins_sp_cial_characters",
    ],
    [
      "Th1s test string c0ntains just a few numb3rs",
      "th1s_test_string_c0ntains_just_a_few_numb3rs",
    ],
    [
      "This is a sentence. This is ANOTHER sentence.",
      "this_is_a_sentence__this_is_another_sentence_",
    ],
    [
      "thisteststring\\looksabit\\likeapath\\witha.file",
      "thisteststring_looksabit_likeapath_witha_file",
    ],
  ],
};
