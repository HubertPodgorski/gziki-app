import React, { useCallback, useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import ChipsGrid from "./ChipsGrid";
import FormButtonsGrid from "./FormButtonsGrid";
import { AppContext } from "../contexts/AppContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { socket } from "./SocketHandler";
import { useIsMobile } from "../hooks/useIsMobile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EventDetails = ({ users, dogs, id }) => {
  const theme = useTheme();

  const [detailsOpen, setDetailsOpen] = useState(false);

  const { dogs: allDogs, users: allUsers } = useContext(AppContext);
  const { user } = useAuthContext();

  const isMobile = useIsMobile();

  const getDogColors = useCallback(
    (_id) => {
      const defaultColors = {
        background: "yellow",
        color: "#333",
        button: "warning",
      };

      const dogFound = dogs.find(
        ({ _id: currentDogId }) => currentDogId === _id
      );

      if (!dogFound) return defaultColors;

      if (dogFound?.status === "PRESENT")
        return { background: "green", color: "#fff", button: "success" };

      if (dogFound?.status === "ABSENT")
        return { background: "red", color: "#fff", button: "error" };

      return defaultColors;
    },
    [dogs]
  );

  const getUserColors = useCallback(
    (_id) => {
      const defaultColors = {
        background: "yellow",
        color: "#333",
        button: "warning",
      };

      const userFound = users.find(
        ({ _id: currentEventUserId }) => currentEventUserId === _id
      );

      if (!userFound) return defaultColors;

      if (userFound?.status === "PRESENT")
        return { background: "green", color: "#fff", button: "success" };

      if (userFound?.status === "ABSENT")
        return { background: "red", color: "#fff", button: "error" };

      return defaultColors;
    },
    [users]
  );

  const onDogPresenceUpdateClick = (dogId) => {
    socket.emit("toggle_event_dog", { dogId, _id: id });
  };

  const onUserPresenceUpdateClick = () => {
    socket.emit("toggle_event_user", { userId: user._id, _id: id });
  };

  const handleDetailsOpenChange = () => {
    setDetailsOpen(!detailsOpen);
  };

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={detailsOpen}
      onChange={handleDetailsOpenChange}
      disableGutters
      sx={{
        background: "#333",
        padding: theme.spacing(1),
        boxShadow: "none",
        [".MuiAccordionDetails-root"]: {
          padding: 0,
        },
        [".MuiAccordionSummary-root"]: {
          minHeight: 0,
          padding: 0,
        },
        [".MuiAccordionSummary-content"]: {
          margin: 0,
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{detailsOpen ? "Hide" : "Show"} details</Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: "grid",
          gridAutoFlow: "rows",
          gridGap: theme.spacing(2),

          [theme.breakpoints.down("md")]: {
            gridGap: theme.spacing(1),
          },
        }}
      >
        <ChipsGrid>
          {allDogs.map(({ name, _id }) => {
            const { color, background } = getDogColors(_id);

            return (
              <Chip
                label={name}
                key={_id}
                sx={{
                  background,
                  color,
                }}
              />
            );
          })}
        </ChipsGrid>

        <ChipsGrid people>
          {allUsers.map(({ name, _id }) => {
            const { background, color } = getUserColors(_id);

            return (
              <Chip
                label={name}
                key={_id}
                sx={{
                  background,
                  color,
                }}
              />
            );
          })}
        </ChipsGrid>

        <Typography variant={isMobile ? "body2" : "body1"}>
          Select dog{user.dogs.length > 1 ? "s" : ""} attendance
        </Typography>

        {user.dogs.length > 0 && (
          <FormButtonsGrid sx={{ justifyContent: "flex-start" }}>
            {user.dogs.map(({ _id: dogId, name }) => (
              <Button
                variant="contained"
                key={dogId}
                color={getDogColors(dogId).button}
                onClick={() => onDogPresenceUpdateClick(dogId)}
                sx={{ minWidth: "150px" }}
              >
                {name}
              </Button>
            ))}
          </FormButtonsGrid>
        )}

        <Typography variant={isMobile ? "body2" : "body1"}>
          Select my attendance
        </Typography>

        <FormButtonsGrid sx={{ justifyContent: "flex-start" }}>
          <Button
            variant="contained"
            color={getUserColors(user._id).button}
            onClick={() => onUserPresenceUpdateClick()}
            sx={{ minWidth: "150px" }}
          >
            {user.name}
          </Button>
        </FormButtonsGrid>
      </AccordionDetails>
    </Accordion>
  );
};

export default EventDetails;
