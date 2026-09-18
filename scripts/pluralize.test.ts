import { describe, it, expect } from "bun:test";
import { formatArabicPlural, COMMON_ARABIC_NOUNS } from "./pluralize";

describe("Arabic Pluralization (CLDR)", () => {
  it("formats zero correctly", () => {
    expect(formatArabicPlural(0, COMMON_ARABIC_NOUNS.app)).toBe("لا توجد تطبيقات");
  });

  it("formats singular (one) correctly", () => {
    expect(formatArabicPlural(1, COMMON_ARABIC_NOUNS.app)).toBe("تطبيق واحد");
  });

  it("formats dual (two) nominative and oblique correctly", () => {
    expect(formatArabicPlural(2, COMMON_ARABIC_NOUNS.app, { dualCase: "nominative" })).toBe("تطبيقان");
    expect(formatArabicPlural(2, COMMON_ARABIC_NOUNS.app, { dualCase: "oblique" })).toBe("تطبيقين");
  });

  it("formats few (3-10) correctly", () => {
    expect(formatArabicPlural(3, COMMON_ARABIC_NOUNS.app)).toBe("3 تطبيقات");
    expect(formatArabicPlural(10, COMMON_ARABIC_NOUNS.app)).toBe("10 تطبيقات");
  });

  it("formats many (11-99) correctly", () => {
    expect(formatArabicPlural(11, COMMON_ARABIC_NOUNS.app)).toBe("11 تطبيقًا");
    expect(formatArabicPlural(99, COMMON_ARABIC_NOUNS.app)).toBe("99 تطبيقًا");
  });

  it("formats other (100+) correctly", () => {
    expect(formatArabicPlural(100, COMMON_ARABIC_NOUNS.app)).toBe("100 تطبيق");
    expect(formatArabicPlural(1500, COMMON_ARABIC_NOUNS.app)).toBe("1500 تطبيق");
  });
});
