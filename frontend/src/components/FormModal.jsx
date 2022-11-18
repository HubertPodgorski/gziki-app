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
} from "@mui/material";

const FormModal = ({ children, open, onClose, title }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>

    <DialogContent sx={{ minWidth: 400 }}>{children}</DialogContent>
  </Dialog>
);

export default FormModal;
