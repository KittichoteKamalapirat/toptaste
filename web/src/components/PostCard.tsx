import { Theme } from "@mui/system";
import React from "react";
import { Post } from "../generated/graphql";
import { Box, Card, Rating, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: Post;
  pointer?: boolean;
  index?: number;
}
const useStyles = makeStyles((theme: Theme) => ({
  responsiveFlex: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "row",
    },
  },
}));

export const PostCard: React.FC<PostCardProps> = ({
  post,
  pointer = false,
  index = 1,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Card
      className={classes.responsiveFlex}
      sx={{
        display: "flex",
        boxShadow: 1,
        padding: 2,
        marginY: 2,
        borderRadius: 4,
        gap: 2,
        cursor: pointer ? "pointer" : null,
      }}
      onClick={() => navigate(`/restaurant/${post.id}`)}
      data-test={`restaurant-card-${index + 1}`}
    >
      <Box sx={{ flexBasis: "30%" }}>
        <Box
          sx={{
            height: 0,
            pb: "100%",
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <img
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={post ? (post.url as string) : undefined}
            alt="restaurant"
          />
        </Box>
      </Box>

      <Box margin={4}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          {post.title}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Rating name="read-only" value={post.reviewAvg} readOnly />
          <Typography component="legend">
            {post.reviewAvg && post.reviewAvg.toFixed(1)}
          </Typography>
          <Typography component="legend">
            ( {post.reviewsSum} {post.reviewsSum !== 1 ? "reviews" : "review"} )
          </Typography>
        </Box>
        <Box marginY={2}>
          <Typography variant="subtitle1" data-test="restaurant description">
            {post.text}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
