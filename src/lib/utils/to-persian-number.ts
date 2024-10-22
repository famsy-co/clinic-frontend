export function toPersianNumber(
  num?: number | string,
  opts?: Intl.NumberFormatOptions,
): string | undefined {
  if (num == null) {
    return;
  }
  return (+num).toLocaleString('fa', { useGrouping: false, ...opts });
}
