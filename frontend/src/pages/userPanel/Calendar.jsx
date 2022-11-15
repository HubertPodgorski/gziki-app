import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { List, ListItem, ListItemText } from "@mui/material";
import CenteredContent from "../../components/CenteredContent";
import dayjs from "dayjs";

const Calendar = () => {
  const { events } = useContext(AppContext);
  // TODO: i know me its me

  return (
    <CenteredContent>
      <List>
        {events.map(({ _id, name, date }) => (
          <ListItem key={_id}>
            <ListItemText>
              {name}: {dayjs(date).format("DD/MM/YYYY HH:mm")}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </CenteredContent>
  );
};

export default Calendar;
