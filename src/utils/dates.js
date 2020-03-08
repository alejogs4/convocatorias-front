/* eslint-disable no-useless-escape */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function getNaturalFormat(date) {
  return format(date, "dd \'de\' MMMM \'del\' yyyy", { locale: es });
}
