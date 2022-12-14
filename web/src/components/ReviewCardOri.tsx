import { Card, CardContent, Typography, Rating } from "@mui/material";
import React from "react";
import moment from "moment";
interface ReviewCardProps {
  label: string;
  score: number;
  visitedDate?: string;
  comment?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  label,
  score,
  visitedDate,
  comment,
}) => {
  let formatted;
  if (visitedDate) {
    const unixDate = new Date(parseInt(visitedDate)).toISOString().slice(0, 10);
    formatted = moment(unixDate).fromNow();
  }

  return (
    <Card sx={{ minWidth: 275, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {label}
        </Typography>
        <Typography
          variant="h2"
          sx={{ mb: 1.5 }}
          color="text.secondary"
          data-test={`${label} Score`}
        >
          {score.toFixed(1)}
        </Typography>

        <Rating name="read-only" value={score} readOnly size="large" />

        {comment && <Typography variant="body1">{comment}</Typography>}

        {visitedDate && (
          <Typography variant="subtitle2" color="GrayText">
            Visited on {formatted}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
