export function trimStringAddEllipsis(string: string, length: number): string {
  return string.length > length ? string.substring(0, length) + "..." : string;
}