import React from "react";
import { Card, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useIsMobile } from "../hooks/useIsMobile";
import EventDetails from "./EventDetails";

const EventCard = ({ event: { _id, name, date, dogs, users } }) => {
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
        {dayjs(date).locale("pl").format("dddd")}{" "}
        {dayjs(date).format("DD/MM/YYYY HH:mm")}
      </Typography>

      <EventDetails users={users} dogs={dogs} id={_id} />
    </Card>
  );
};

export default EventCard;
