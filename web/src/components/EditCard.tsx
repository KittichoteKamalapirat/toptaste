import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

interface EditCardProps {
  buttonText: string;
  link: string;
}

export const EditCard: React.FC<EditCardProps> = ({ buttonText, link }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginY: 4,
      }}
      onClick={() => navigate(link)}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Edit
        </Typography>

        <Typography variant="body1" sx={{ mb: 1.5 }} color="text.secondary">
          Only an admin can edit a post
        </Typography>
      </CardContent>
      <Box m={3}>
        <Button startIcon={<ModeEditIcon />} variant="contained">
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};
