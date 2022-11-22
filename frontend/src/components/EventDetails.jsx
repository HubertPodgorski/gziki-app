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

        <ChipsGrid people>
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

        <Typography variant={isMobile ? "body2" : "body1"}>
          Select dog{user.dogs.length > 1 ? "s" : ""} attendance
        </Typography>

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

        <Typography variant={isMobile ? "body2" : "body1"}>
          Select my attendance
        </Typography>

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
      </AccordionDetails>
    </Accordion>
  );
};

export default EventDetails;
