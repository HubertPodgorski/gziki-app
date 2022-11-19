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
  },
}));

const FormModal = ({ children, open, onClose, title }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>

    <DialogContentStyled>{children}</DialogContentStyled>
  </Dialog>
);

export default FormModal;
