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
      {sortedEvents.map((event) => (
        <EventCard event={event} key={event._id} />
      ))}
    </Box>
  );
};

export default Calendar;
