import { Theme } from "@mui/system";
import React from "react";
import { Post } from "../generated/graphql";
import { Box, Card, Paper, Rating, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: Post;
  pointer?: boolean;
  index?: number;
  snippet?: boolean;
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

export const PostCard: React.FC<PostCardProps> = ({
  post,
  pointer = false,
  index = 1,
  snippet = false,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Box
      className={classes.responsiveFlex}
      sx={{
        display: "flex",
        cursor: pointer ? "pointer" : null,
      }}
      onClick={() => navigate(`/restaurant/${post.id}`)}
      data-test={`restaurant-card-${index + 1}`}
    >
      <Box sx={{ flexBasis: "40%" }}>
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

      <Box margin={1} sx={{ flexBasis: "60%" }}>
        <Typography component="h2" className={classes.responsiveFont}>
          {post.title}
        </Typography>
        <Box className={classes.responsiveFlex}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" component="legend" fontWeight={"bold"}>
              {post.reviewAvg && post.reviewAvg.toFixed(1)}
            </Typography>
            <Rating name="read-only" value={post.reviewAvg} readOnly />
          </Box>

          <Typography variant="caption" component="legend">
            ( {post.reviewsCounter}{" "}
            {post.reviewsCounter !== 1 ? "reviews" : "review"} )
          </Typography>
        </Box>
        <Box marginY={1}>
          <Typography variant="caption" data-test="restaurant description">
            {snippet ? post.textSnippet : post.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
