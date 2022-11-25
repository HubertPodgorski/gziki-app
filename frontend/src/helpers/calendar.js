import dayjs from "dayjs";

export const sortByNewest = (eventA, eventB) => {
  return new Date(eventB.date) - new Date(eventA.date);
};

export const getFormattedDate = (date) =>
  `${dayjs(date).locale("pl").format("dddd")} ${dayjs(date).format(
    "DD/MM/YYYY HH:mm"
  )}`.toUpperCase();

export const sortByAttendance = (objectA, objectB) => {
  if (objectA.status === objectB.status) return 0;

  // dog/user A is PRESENT OR is ABSENT but dog/user B didn't select yet
  if (
    objectA.status === "PRESENT" ||
    (objectA.status === "ABSENT" && !objectB.status)
  )
    return -1;

  // dog/user B is PRESENT OR is ABSENT but dog/user A didn't select yet
  if (
    objectB.status === "PRESENT" ||
    (objectB.status === "ABSENT" && !objectA.status)
  )
    return 1;

  return 0;
};
