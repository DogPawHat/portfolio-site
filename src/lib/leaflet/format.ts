const dateFormat = new Intl.DateTimeFormat("en-IE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Dublin",
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}
