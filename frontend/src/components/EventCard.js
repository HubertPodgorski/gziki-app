import React, { useCallback, useContext } from "react";
import { Button, Card, Chip, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import ChipsGrid from "./ChipsGrid";
import FormButtonsGrid from "./FormButtonsGrid";
import { useAuthContext } from "../hooks/useAuthContext";
import { socket } from "./SocketHandler";
import { AppContext } from "../contexts/AppContext";

const EventCard = ({ event: { _id, name, date, dogs, users } }) => {
  const { dogs: allDogs, users: allUsers } = useContext(AppContext);

  const { user } = useAuthContext();
  const theme = useTheme();

  const isDogPresent = useCallback(
    (_id) => dogs.find(({ _id: currentDogId }) => currentDogId === _id),
    [dogs]
  );

  const isUserPresent = useCallback(
    (_id) => {
      return users.find(
        ({ _id: currentEventUserId }) => currentEventUserId === _id
      );
    },
    [users]
  );

  const onDogPresenceUpdateClick = (dogId) => {
    socket.emit("toggle_event_dog", { dogId, _id });
  };

  const onUserPresenceUpdateClick = () => {
    socket.emit("toggle_event_user", { userId: user._id, _id });
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

      <ChipsGrid>
        {allDogs.map(({ name, _id }) => (
          <Chip
            label={name}
            key={_id}
            sx={{
              background: isDogPresent(_id) ? "green" : "yellow",
              color: isDogPresent(_id) ? "#fff" : "#333",
            }}
          />
        ))}
      </ChipsGrid>

      <ChipsGrid>
        {allUsers.map(({ name, _id }) => (
          <Chip
            label={name}
            key={_id}
            sx={{
              background: isUserPresent(_id) ? "green" : "yellow",
              color: isUserPresent(_id) ? "#fff" : "#333",
            }}
          />
        ))}
      </ChipsGrid>

      {user.dogs.length > 0 && (
        <FormButtonsGrid sx={{ justifyContent: "flex-start" }}>
          {user.dogs.map(({ _id: dogId, name }) => (
            <Button
              variant="contained"
              key={dogId}
              color={isDogPresent(dogId) ? "success" : "error"}
              onClick={() => onDogPresenceUpdateClick(dogId)}
              sx={{ minWidth: "150px" }}
            >
              {name}
            </Button>
          ))}
        </FormButtonsGrid>
      )}

      <FormButtonsGrid sx={{ justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          color={isUserPresent(user._id) ? "success" : "error"}
          onClick={() => onUserPresenceUpdateClick()}
          sx={{ minWidth: "150px" }}
        >
          {user.name}
        </Button>
      </FormButtonsGrid>
    </Card>
  );
};

export default EventCard;
