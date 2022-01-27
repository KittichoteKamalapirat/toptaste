import React from "react";
import { Post, usePostsQuery } from "../generated/graphql";
import Box from "@mui/material/Box";

import { XContainer } from "../components/layouts/XContainer";
import { XCenter } from "../components/layouts/XCenter";
import { PostCard } from "../components/PostCard";
import { Button } from "@mui/material";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { data, loading, error, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
  });
  console.log({ data });
  return (
    <XContainer>
      {data?.posts.posts.map((post) => (
        <Box key={post.id}>
          <PostCard post={post as Post} pointer={true} />
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
