import React from "react";
import { Box, Card, CardContent, useTheme } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  display: "grid",
  gridAutoFlow: "row",
  padding: theme.spacing(1),
  gridGap: theme.spacing(2),
  height: "112px",
  alignItems: "center",
  position: "relative",
}));

const TaskCell = ({ children, adminPanel, id, index, onClick }) => {
  if (!adminPanel)
    return (
      <Card>
        <CardContentStyled>{children}</CardContentStyled>
      </Card>
    );

  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Card
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
          onClick={() => {
            onClick?.();
          }}
        >
          <CardContentStyled>{children}</CardContentStyled>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCell;
