import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  handleDelete: () => void;
  transparent?: boolean;
  label?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  handleDelete,
  transparent = false,
  label = null,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        color="secondary"
        variant={transparent ? "text" : "contained"}
        onClick={handleClickOpen}
      >
        {label}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to continue?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color="warning">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
