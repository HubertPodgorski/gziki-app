import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  styled,
  useTheme,
} from "@mui/material";

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  minWidth: 400,
  maxWidth: 600,
  [theme.breakpoints.down("md")]: {
    minWidth: 300,
    padding: theme.spacing(1),
  },
}));

const FormModal = ({ children, open, onClose, title }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        [theme.breakpoints.down("md")]: {
          ".MuiDialog-paper": {
            margin: theme.spacing(1),
            width: "100%",
          },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContentStyled>{children}</DialogContentStyled>
    </Dialog>
  );
};

export default FormModal;
