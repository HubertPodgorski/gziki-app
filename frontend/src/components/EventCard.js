import React, { useCallback, useContext } from "react";
import { Button, Card, Chip, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import DogChipsGrid from "./DogChipsGrid";
import FormButtonsGrid from "./FormButtonsGrid";
import { useAuthContext } from "../hooks/useAuthContext";
import { socket } from "./SocketHandler";
import { AppContext } from "../contexts/AppContext";

const EventCard = ({ event: { _id, name, date, dogs } }) => {
  const { dogs: allDogs } = useContext(AppContext);

  const { user } = useAuthContext();
  const theme = useTheme();

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
  );
};

export default EventCard;
