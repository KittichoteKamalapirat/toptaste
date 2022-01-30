import { Theme } from "@mui/system";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Rating,
  Paper,
} from "@mui/material";
import React from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";

interface ReviewCardProps {
  label?: string;
  score: number;
  visitedDate?: string;
  comment?: string;
  avatar?: string;
  username?: string;
  reviewsCounter?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  responsiveFlex: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  responsiveFont: {
    fontWeight: 900,
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
    },
  },
}));

export const ReviewCard: React.FC<ReviewCardProps> = ({
  label,
  score,
  visitedDate,
  comment,
  avatar,
  username,
  reviewsCounter,
}) => {
  let formatted;
  const classes = useStyles();
  if (visitedDate) {
    const unixDate = new Date(parseInt(visitedDate)).toISOString().slice(0, 10);
    formatted = moment(unixDate).fromNow();
  }

  return (
    <Box>
      {label && (
        <Typography variant="body2" fontWeight={600} component="h4">
          {label}
        </Typography>
      )}

      <Paper elevation={0} sx={{ minWidth: 275, textAlign: "center" }}>
        <CardContent sx={{ paddingTop: 1, paddingX: 0 }}>
          <Box sx={{ display: "flex" }}>
            {username && (
              <Avatar
                alt={username}
                src={avatar || "/static/images/avatar/2.jpg"}
                sx={{ bgcolor: "black" }}
              />
            )}

            <Box marginLeft={1}>
              <Typography variant="body2" textAlign="left">
                {username}{" "}
              </Typography>

              <Box className={classes.responsiveFlex}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography component="legend">
                    {score && score.toFixed(1)}
                  </Typography>
                  <Rating name="read-only" value={score} readOnly />
                  {reviewsCounter && (
                    <Typography variant="caption" component="legend">
                      ( {reviewsCounter}{" "}
                      {reviewsCounter !== 1 ? "reviews" : "review"} )
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            {comment && (
              <Typography variant="body1" textAlign="left">
                {comment}
              </Typography>
            )}
            {visitedDate && (
              <Typography
                variant="subtitle2"
                color="GrayText"
                textAlign="left"
                sx={{ fontSize: "10px" }}
              >
                Visited on {formatted}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Paper>
    </Box>
  );
};
