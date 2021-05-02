export function fixDate(x: number) {
  return readableDate(x * 1000);
}
export function readableDate(x: number) {
  return new Date(x).toLocaleString("en", dateFormatOptions);
}
export const dateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
} as const;

export function dateTimeLocalCompat(d: Date): string {
  return new Date(d.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
    .toISOString()
    .slice(0, 19);
}
