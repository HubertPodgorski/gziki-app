import React from "react";
import { Card, Typography, useTheme } from "@mui/material";
import { useIsMobile } from "../hooks/useIsMobile";
import EventDetails from "./EventDetails";
import { getFormattedDate } from "../helpers/calendar";
import { EventType } from "./inputs/consts";

const getColorBasedOnType = (type) => {
  console.log("type => ", type);
  switch (type) {
    case EventType.COMPETITION:
      return "";
    case EventType.SEMINARY:
      return "";
    case EventType.TRAINING:
    default:
      return "blue";
  }
};

const EventCard = ({ event: { _id, name, date, dogs, users, type } }) => {
  const isMobile = useIsMobile();

  const theme = useTheme();

  return (
    <Card
      key={_id}
      sx={{
        padding: theme.spacing(2),
        display: "grid",
        gridAutoFlow: "rows",
        gridGap: theme.spacing(2),
        backgroundColor: getColorBasedOnType(type),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(1),
          gridGap: theme.spacing(1),
        },
      }}
    >
      <Typography variant={isMobile ? "body1" : "h5"}>{name}</Typography>

      <Typography
        variant={isMobile ? "body2" : "body1"}
        sx={{ textTransform: "uppercase" }}
      >
        {getFormattedDate(date)}
      </Typography>

      <EventDetails users={users} dogs={dogs} id={_id} />
    </Card>
  );
};

export default EventCard;
