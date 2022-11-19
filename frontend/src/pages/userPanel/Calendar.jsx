import React, { useCallback, useContext, useMemo } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { socket } from "../../components/SocketHandler";
import { findNextEventId, sortByNewest } from "../../helpers/calendar";
import EventCard from "../../components/EventCard";

const Calendar = () => {
  const theme = useTheme();

  const { events } = useContext(AppContext);

  const sortedEvents = useMemo(() => events.sort(sortByNewest), [events]);

  const nextEvent = useMemo(() => {
    if (!events || !events.length) return null;
    const nextEventId = findNextEventId(events);

    if (!nextEventId) return null;

    const eventFound = events.find(({ _id }) => nextEventId === _id);

    if (!eventFound) return null;

    return eventFound;
  }, [events]);

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridGap: theme.spacing(2),
        padding: theme.spacing(2),

        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(1),
          gridGap: theme.spacing(1),
        },
      }}
    >
      {!!nextEvent && (
        <>
          <Typography variant="h5">Nearest next event</Typography>
          <EventCard event={nextEvent} />
          <Divider sx={{ margin: theme.spacing(2, 0) }} />
        </>
      )}

      {sortedEvents.map((event) => (
        <EventCard event={event} key={event._id} />
      ))}
    </Box>
  );
};

export default Calendar;
