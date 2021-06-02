export const sanitizeRegExp = /([^\w]|_)/g;
export const clean = (x: any) =>
  (x + "").replace(sanitizeRegExp, "").toLowerCase();

export const containsExact = (b: any, a: any) => clean(b).includes(a);

export const contains = (b: any, a: any) => containsExact(b, clean(a));
