import EditIcon from "@mui/icons-material/Edit";
import { deepOrange } from "@mui/material/colors";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  useDeletePostMutation,
  useDeleteUserMutation,
  usePostsQuery,
} from "../generated/graphql";
import { DeleteButton } from "./DeleteButton";
import Loading from "./Loading";
import { useUsersQuery } from "../generated/graphql";
import { Typography } from "@mui/material";
import {
  useAllReviewsQuery,
  useDeleteReviewMutation,
} from "../generated/graphql";

export const ReviewsTable = () => {
  const { data: reviewsData, loading, error } = useAllReviewsQuery();

  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (postId: number, reviewId: number) => {
    const { errors } = await deleteReview({
      variables: {
        id: reviewId,
        postId: postId,
      },
      update: (cache) => {
        cache.evict({ id: "Review:" + reviewId });
        // cache.evict({ id: "Post:" + param.postId });
      },
    });
    if (errors) {
      console.log(errors);
    }
  };

  //table

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "userId", headerName: "userId", width: 100 },
    { field: "comment", headerName: "comment", width: 200 },
    { field: "score", headerName: "score", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        const postId = params.value.postId;
        const reviewId = params.value.reviewId;
        return (
          <>
            <Link to={`/restaurant/${postId}/review/${reviewId}/update`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteButton
              handleDelete={() => handleDelete(postId, reviewId)}
              transparent={true}
            />
          </>
        );
      },
    },
  ];

  const rows = reviewsData?.allReviews.map((review) => {
    return {
      id: review.id,
      userId: review.userId,
      comment: review.comment,
      score: review.score,
      actions: { reviewId: review.id, postId: review.postId },
    };
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h6" component="h2">
        Review
      </Typography>
      <DataGrid
        rows={rows!}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};
