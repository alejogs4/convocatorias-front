/* eslint-disable no-useless-escape */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { differenceInCalendarMonths } from "date-fns";

export function getNaturalFormat(date) {
  return format(date, "dd \'de\' MMMM \'del\' yyyy", { locale: es });
}

export const handleChangeDates = (beginDate, finalDate) => {
  if (beginDate && finalDate) {
    let beginDateFormat = new Date(beginDate);
    let finalDateFormat = new Date(finalDate);

    return differenceInCalendarMonths(finalDateFormat, beginDateFormat);
  }
  return 0;
};
