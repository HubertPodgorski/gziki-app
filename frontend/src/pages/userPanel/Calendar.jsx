import React, { useCallback, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Box, Button, Card, Chip, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import DogChipsGrid from "../../components/DogChipsGrid";
import { useAuthContext } from "../../hooks/useAuthContext";
import FormButtonsGrid from "../../components/FormButtonsGrid";
import { socket } from "../../components/SocketHandler";

const Calendar = () => {
  const theme = useTheme();

  const { events, dogs: allDogs } = useContext(AppContext);
  const { user } = useAuthContext();

  // TODO: i know me its me

  const isDogPresent = useCallback(
    (_id, eventDogs) => {
      return eventDogs.find(({ _id: currentDogId }) => currentDogId === _id);
    },
    [allDogs]
  );

  const onDogPresenceUpdateClick = (dogId, eventId) => {
    socket.emit("toggle_event_dog", { dogId: dogId, _id: eventId });
  };

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
      {events.map(({ _id, name, date, dogs }) => (
        <Card
          key={_id}
          sx={{
            padding: theme.spacing(2),
            display: "grid",
            gridAutoFlow: "rows",
            gridGap: theme.spacing(2),

            [theme.breakpoints.down("md")]: {
              padding: theme.spacing(1),
              gridGap: theme.spacing(1),
            },
          }}
        >
          <Typography variant="h5">{name}</Typography>

          <Typography variant="body1" sx={{ textTransform: "uppercase" }}>
            {dayjs(date).locale("pl").format("dddd")}{" "}
            {dayjs(date).format("DD/MM/YYYY HH:mm")}
          </Typography>

          <DogChipsGrid>
            {allDogs.map(({ name, _id }) => (
              <Chip
                label={name}
                key={_id}
                sx={{
                  background: isDogPresent(_id, dogs) ? "green" : "yellow",
                  color: isDogPresent(_id, dogs) ? "#fff" : "#333",
                }}
              />
            ))}
          </DogChipsGrid>

          {user.dogs.length > 0 && (
            <FormButtonsGrid sx={{ justifyContent: "flex-start" }}>
              {user.dogs.map(({ _id: dogId, name }) => (
                <Button
                  variant="contained"
                  key={dogId}
                  color={isDogPresent(dogId, dogs) ? "success" : "error"}
                  onClick={() => onDogPresenceUpdateClick(dogId, _id)}
                  sx={{ minWidth: "150px" }}
                >
                  {name}
                </Button>
              ))}
            </FormButtonsGrid>
          )}
        </Card>
      ))}
    </Box>
  );
};

export default Calendar;
