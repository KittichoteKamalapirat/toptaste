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
        <Typography variant="h2" sx={{ mb: 1.5 }} color="text.secondary">
          {score.toFixed(1)}
        </Typography>

        <Rating name="read-only" value={4.8} readOnly size="large" />

        {comment && <Typography variant="body2">{comment}</Typography>}

        {visitedDate && (
          <Typography variant="subtitle1">Visited on {formatted}</Typography>
        )}
      </CardContent>
    </Card>
  );
};
