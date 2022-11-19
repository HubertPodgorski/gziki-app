export const sortByNewest = (eventA, eventB) => {
  return new Date(eventB.date) - new Date(eventA.date);
};

export const findNextEventId = (events) => {
  if (!events || !events.length) return null;

  const { _id: nearestEventId } = events.reduce(
    (nearestEvent, { _id, date }) => {
      const isEventBeforeToday = new Date() - new Date(date) > 0;

      if (isEventBeforeToday) return nearestEvent;

      const currentEventIsAfterPreviousEvent =
        nearestEvent.date - new Date(date) > 0;

      if (currentEventIsAfterPreviousEvent) return nearestEvent;

      return { _id, date };
    },
    { _id: null, date: new Date() }
  );

  return nearestEventId;
};
