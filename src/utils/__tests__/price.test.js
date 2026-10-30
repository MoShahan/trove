import {
  formatDiscountLabel,
  formatPrice,
  getDiscountPercent,
  getSalePrice,
} from "@/utils/price";

describe("formatPrice", () => {
  it("adds thousand separators and two decimal places", () => {
    expect(formatPrice(4000)).toBe("$4,000.00");
    expect(formatPrice(1999.99)).toBe("$1,999.99");
    expect(formatPrice(9.99)).toBe("$9.99");
  });

  it("treats missing values as zero", () => {
    expect(formatPrice(undefined)).toBe("$0.00");
    expect(formatPrice(null)).toBe("$0.00");
  });
});

describe("discount helpers", () => {
  it("computes the sale price from a percentage off", () => {
    expect(getDiscountPercent(10.48)).toBe(10.48);
    expect(getSalePrice(9.99, 10)).toBeCloseTo(8.991);
    expect(formatDiscountLabel(10.48)).toBe("-10%");
  });

  it("treats missing discounts as no markdown", () => {
    expect(getDiscountPercent(undefined)).toBe(0);
    expect(getSalePrice(50, null)).toBe(50);
    expect(formatDiscountLabel(0)).toBe("");
  });
});
