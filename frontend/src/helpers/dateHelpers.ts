import { pl } from "date-fns/locale/pl";
import { format } from "date-fns";

export const formatDate = (date: string | Date, dateFormat: string) =>
  format(date, dateFormat, { locale: pl });
