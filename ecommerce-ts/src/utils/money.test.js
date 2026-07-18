import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

// "it" 这个测试在测什么
// "expect" 实际测试
// "describe" 测试组的名字

describe("formatMoney", () => {
  it("should format cents to dollarscorrectly", () => {
    expect(formatMoney(1000)).toBe("$10.00");
    expect(formatMoney(123456789)).toBe("$1234567.89");
    expect(formatMoney(0)).toBe("$0.00");
  });
});
