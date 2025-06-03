import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  useTheme,
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  minWidth: 400,
  maxWidth: 600,
  [theme.breakpoints.down("md")]: {
    minWidth: 300,
    padding: theme.spacing(1),
  },
}));

const Modal = ({ open, onClose, children, title }: Props) => {
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

export default Modal;
