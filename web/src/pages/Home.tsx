import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { XCenter } from "../components/layouts/XCenter";
import { XContainer } from "../components/layouts/XContainer";
import Loading from "../components/Loading";
import { PostCard } from "../components/PostCard";
import { Post, usePostsQuery } from "../generated/graphql";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
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
      {data?.posts.posts.map((post, index) => (
        <Box key={(post && post.id && post.id.toString()) || Math.random()}>
          <PostCard post={post as Post} pointer={true} index={index} />
        </Box>
      ))}

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
