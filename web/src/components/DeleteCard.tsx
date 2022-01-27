import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteButton } from "./DeleteButton";

interface DeleteCardProps {
  buttonText: string;
  handleDelete: () => void;
}

export const DeleteCard: React.FC<DeleteCardProps> = ({
  buttonText,
  handleDelete,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 4,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Delete
          </Typography>

          <Typography variant="body1" sx={{ mb: 1.5 }} color="text.secondary">
            Once you delete a repository, there is no going back. Please be
            certain
          </Typography>
        </CardContent>
        <Box m={3}>
          <DeleteButton handleDelete={handleDelete} label={buttonText} />
        </Box>
      </Card>
    </>
  );
};
