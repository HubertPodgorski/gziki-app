import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
  useTheme,
} from "@mui/material";

const FormModal = ({ children, open, onClose, title }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        sx={{
          minWidth: 400,
          [theme.breakpoints.down("md")]: {
            minWidth: 300,
          },
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
