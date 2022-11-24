import dayjs from "dayjs";

export const sortByNewest = (eventA, eventB) => {
  return new Date(eventB.date) - new Date(eventA.date);
};

export const getFormattedDate = (date) =>
  `${dayjs(date).locale("pl").format("dddd")} ${dayjs(date).format(
    "DD/MM/YYYY HH:mm"
  )}`.toUpperCase();
