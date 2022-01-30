import { Button, Grid, Paper, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { XCenter } from "../components/layouts/XCenter";
import { XContainer } from "../components/layouts/XContainer";
import Loading from "../components/Loading";
import { PostCard } from "../components/PostCard";
import { Post, usePostsQuery } from "../generated/graphql";
import { makeStyles } from "@mui/styles";

interface HomeProps {}
const useStyles = makeStyles((theme: Theme) => ({
  responsiveFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      // gap: "10px",
    },
    [theme.breakpoints.up("sm")]: {
      gap: "20px",
    },
  },
  flexItem: {
    flexBasis: "45%", //min-width
    maxWidth: "45%",
  },
}));

export const Home: React.FC<HomeProps> = ({}) => {
  const classes = useStyles();
  const { data, loading, error, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error.message);
  }

  return (
    <XContainer>
      <Box className={classes.responsiveFlex}>
        {data?.posts.posts.map((post, index) => (
          <Paper
            key={(post && post.id && post.id.toString()) || Math.random()}
            className={classes.flexItem}
            elevation={0}
          >
            <PostCard
              post={post as Post}
              pointer={true}
              index={index}
              snippet={true}
            />
          </Paper>
        ))}
      </Box>

      {data && data.posts.hasMore ? (
        <XCenter>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data?.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            variant="contained"
            color="primary"
          >
            load more
          </Button>
        </XCenter>
      ) : null}
    </XContainer>
  );
};
