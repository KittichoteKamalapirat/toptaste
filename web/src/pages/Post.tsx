import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { XCenter } from "../components/layouts/XCenter";
import { XContainer } from "../components/layouts/XContainer";
import Loading from "../components/Loading";
import { PostCard } from "../components/PostCard";
import { ReviewCard } from "../components/ReviewCard";
import {
  Post as PostType,
  useBestReviewQuery,
  useDeletePostMutation,
  useLatestReviewQuery,
  useMeQuery,
  usePostQuery,
  useWorstReviewQuery,
} from "../generated/graphql";
import { EditCard } from "../components/EditCard";
import { DeleteCard } from "../components/DeleteCard";

interface PostProps {}

export const Post: React.FC<PostProps> = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: meData } = useMeQuery();

  const [deletePost] = useDeletePostMutation();
  const {
    data: post,
    loading,
    error,
  } = usePostQuery({
    variables: {
      id: parseInt(params.id!),
    },
  });

  const { data: latest } = useLatestReviewQuery({
    variables: { postId: parseInt(params.id!) },
  });

  const { data: best } = useBestReviewQuery({
    variables: { postId: parseInt(params.id!) },
  });

  const { data: worst } = useWorstReviewQuery({
    variables: { postId: parseInt(params.id!) },
  });

  const handleDelete = async () => {
    const { errors } = await deletePost({
      variables: {
        id: parseInt(params.id!),
      },
      update: (cache) => {
        cache.evict({ id: "Post:" + post?.post?.id });
      },
    });

    if (!errors) {
      navigate("/");
    }
  };

  if (loading) {
    return <Loading />;
  } else if (error || post?.post === null) {
    navigate(-1);
  }

  return (
    <XContainer>
      <Box>
        <PostCard post={post?.post as PostType} />
        <Grid container spacing={4}>
          {post?.post?.reviewsSum && post.post.reviewsSum > 0 ? (
            <Grid item xs={12}>
              <ReviewCard
                label="Average Review"
                score={post?.post?.reviewAvg!}
              />
            </Grid>
          ) : (
            <XCenter>
              <Box sx={{ marginTop: 10 }}>
                <Typography variant="h6">
                  There are currently no reviews yet
                </Typography>
              </Box>
            </XCenter>
          )}

          {best?.bestReview && (
            <Grid item xs={12} md={4}>
              <ReviewCard
                label="Best Review"
                score={best?.bestReview.score!}
                comment={best?.bestReview.comment}
                visitedDate={best?.bestReview.visitedDate!}
              />
            </Grid>
          )}

          {latest?.latestReview && (
            <Grid item xs={12} md={4}>
              <ReviewCard
                label="Latest Review"
                score={latest?.latestReview.score!}
                comment={latest?.latestReview.comment!}
                visitedDate={latest?.latestReview.visitedDate!}
              />
            </Grid>
          )}

          {worst?.worstReview && (
            <Grid item xs={12} md={4}>
              <ReviewCard
                label="Worst Review"
                score={worst?.worstReview.score!}
                comment={worst?.worstReview.comment!}
                visitedDate={worst.worstReview.visitedDate!}
              />
            </Grid>
          )}
        </Grid>
      </Box>

      <XCenter>
        <Button
          variant="contained"
          onClick={() =>
            navigate(`/restaurant/${post?.post?.id}/review/create`)
          }
          sx={{ marginTop: 4 }}
        >
          Create a review
        </Button>
      </XCenter>

      {meData?.me?.isAdmin && (
        <>
          <EditCard
            buttonText="Edit this restaurant"
            link={`/restaurant/${post?.post?.id}/update`}
          />

          <DeleteCard
            buttonText="Delete the restaurant"
            handleDelete={handleDelete}
          />
        </>
      )}
    </XContainer>
  );
};