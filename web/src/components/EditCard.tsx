import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Theme,
} from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

interface EditCardProps {
  buttonText: string;
  link: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  responsiveFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginY: "20px",
    },
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "20px",
    },
  },
}));

export const EditCard: React.FC<EditCardProps> = ({ buttonText, link }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card className={classes.responsiveFlex} onClick={() => navigate(link)}>
      <CardContent>
        <Typography variant="h5" component="div">
          Edit
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Only an admin can edit a post
        </Typography>
      </CardContent>
      <Box className={classes.button}>
        <Button startIcon={<ModeEditIcon />} variant="contained">
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};
