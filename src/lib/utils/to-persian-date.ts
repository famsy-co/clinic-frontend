import dayjs from 'dayjs';

import { toPersianNumber } from './to-persian-number';

export function toPersianDate(date?: string | Date | null) {
  if (date == null) {
    return;
  }
  const dayjsDate = dayjs(date);
  return (
    toPersianNumber(dayjsDate.get('years')) +
    '/' +
    toPersianNumber(dayjsDate.get('months'))?.padStart(2, toPersianNumber(0)) +
    '/' +
    toPersianNumber(dayjsDate.get('days'))?.padStart(2, toPersianNumber(0))
  );
}
