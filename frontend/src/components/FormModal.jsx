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
          margin: theme.spacing(1),
        },
      }}
    >
      <DialogTitle
        sx={{
          [theme.breakpoints.down("md")]: {
            padding: theme.spacing(1),
          },
        }}
      >
        {title}
      </DialogTitle>

      <DialogContentStyled>{children}</DialogContentStyled>
    </Dialog>
  );
};

export default FormModal;
