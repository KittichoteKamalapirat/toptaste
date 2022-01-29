import { Box, Card, CardContent, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { DeleteButton } from "./DeleteButton";

interface DeleteCardProps {
  buttonText: string;
  handleDelete: () => void;
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

export const DeleteCard: React.FC<DeleteCardProps> = ({
  buttonText,
  handleDelete,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const classes = useStyles();
  return (
    <>
      <Card className={classes.responsiveFlex}>
        <CardContent>
          <Typography variant="h5" component="div">
            Delete
          </Typography>

          <Typography variant="body1" sx={{ mb: 1.5 }} color="text.secondary">
            Once you delete a repository, there is no going back. Please be
            certain
          </Typography>
        </CardContent>
        <Box className={classes.button}>
          <DeleteButton handleDelete={handleDelete} label={buttonText} />
        </Box>
      </Card>
    </>
  );
};
