import { describe, expect, test } from "vitest";
import { toStudlyCaps } from "../toStudlyCaps";

describe("Studly Caps tests", { concurrent: true }, () => {
  describe("basic characteristics", { concurrent: true }, () => {
    test("should contain both upper and lowercase letters", () => {
      const input = "this is a test string";
      const result = toStudlyCaps({ input });
      
      const hasUpperCase = /[A-Z]/.test(result);
      const hasLowerCase = /[a-z]/.test(result);
      
      expect(hasUpperCase).toBe(true);
      expect(hasLowerCase).toBe(true);
    });

    test("should maintain the same letters (case-insensitive)", () => {
      const input = "hello world";
      const result = toStudlyCaps({ input });
      
      expect(result.toLowerCase()).toBe(input.toLowerCase());
    });

    test("should not have the same case pattern on multiple runs", () => {
      const input = "test string";
      const results = new Set();
      
      for (let i = 0; i < 5; i++) {
        results.add(toStudlyCaps({ input }));
      }
      
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe("with alphaNumeric option", { concurrent: true }, () => {
    test("should preserve numbers", () => {
      const input = "test123test";
      const result = toStudlyCaps({ 
        input, 
        options: { alphaNumeric: true } 
      });
      
      expect(result).toMatch(/123/);
    });

    test("should remove special characters", () => {
      const input = "test@#$test";
      const result = toStudlyCaps({ 
        input, 
        options: { alphaNumeric: true } 
      });
      
      expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });

  describe("with replace option", { concurrent: true }, () => {
    test("should replace special characters with specified character", () => {
      const input = "test@#$test";
      const result = toStudlyCaps({ 
        input, 
        options: { 
          alphaNumeric: true, 
          replace: "_" 
        } 
      });
      
      expect(result).toMatch(/^[a-zA-Z0-9_]+$/);
    });
  });
});