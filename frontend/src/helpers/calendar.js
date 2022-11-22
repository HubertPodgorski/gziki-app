export const sortByNewest = (eventA, eventB) => {
  return new Date(eventB.date) - new Date(eventA.date);
};
