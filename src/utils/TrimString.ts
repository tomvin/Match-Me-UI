export function trimStringAddEllipsis(string: string, length: number): string {
  if (!string) {
    return '';
  }
  
  return string.length > length ? string.substring(0, length) + "..." : string;
}