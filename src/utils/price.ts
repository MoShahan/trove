const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value?: number | string | null) => {
  const amount = Number(value);

  return currencyFormatter.format(Number.isFinite(amount) ? amount : 0);
};

export const getDiscountPercent = (discount?: number | string | null) => {
  const percent = Number(discount);

  return Number.isFinite(percent) && percent > 0 ? percent : 0;
};

export const getSalePrice = (
  price?: number | string | null,
  discount?: number | string | null
) => {
  const amount = Number(price);
  const base = Number.isFinite(amount) ? amount : 0;

  return base * (1 - getDiscountPercent(discount) / 100);
};

export const formatDiscountLabel = (discount?: number | string | null) => {
  const percent = getDiscountPercent(discount);

  return percent ? `-${Math.round(percent)}%` : "";
};
