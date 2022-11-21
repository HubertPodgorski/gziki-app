import React from "react";
import { Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChipsGrid from "./ChipsGrid";
import TaskCell from "./tasksGrid/TaskCell";
import { useAuthContext } from "../hooks/useAuthContext";
import { isMyDog } from "../helpers/tasks";

const UserTaskCell = ({ item: { _id, dogs, description }, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuthContext();

  return (
    <TaskCell index={index} id={_id} key={_id}>
      <Typography variant={isMobile ? "body2" : "h5"}>{description}</Typography>

      {dogs.length > 0 && (
        <ChipsGrid dense>
          {dogs.map(({ name, _id }) => (
            <Chip
              label={name}
              key={_id}
              color={isMyDog(_id, user.dogs) ? "success" : "default"}
            />
          ))}
        </ChipsGrid>
      )}

      {dogs.length === 0 && <Typography>No dogs selected</Typography>}
    </TaskCell>
  );
};

export default UserTaskCell;
