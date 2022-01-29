import EditIcon from "@mui/icons-material/Edit";
import { deepOrange } from "@mui/material/colors";
import { DataGrid, GridRenderCellParams, GridFooter } from "@mui/x-data-grid";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeletePostMutation,
  useDeleteUserMutation,
  usePostsQuery,
} from "../generated/graphql";
import { DeleteButton } from "./DeleteButton";
import Loading from "./Loading";
import { useUsersQuery } from "../generated/graphql";
import { Box, Button, Typography } from "@mui/material";
import {
  useAllReviewsQuery,
  useDeleteReviewMutation,
} from "../generated/graphql";
import moment from "moment";

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
    { field: "postId", headerName: "Restaurant ID", width: 120 },
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "comment", headerName: "comment", width: 200 },
    { field: "visitedDate", headerName: "Visited Date", width: 200 },
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
    const unixDate = new Date(parseInt(review.visitedDate))
      .toISOString()
      .slice(0, 10);
    const formatted = moment(unixDate).format("ll");
    return {
      id: review.id,
      postId: review.postId,
      userId: review.userId,
      comment: review.comment,
      visitedDate: formatted,
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
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Footer: CustomFooterStatusComponent,
        }}
      />
    </div>
  );
};

export function CustomFooterStatusComponent(props: {
  status: "connected" | "disconnected";
}) {
  return (
    <Box
      sx={{ margin: "10px", display: "flex", justifyContent: "space-between" }}
    >
      <Typography variant="body1" component="div">
        *To add review, please visit a restaurant you want to review
      </Typography>

      <GridFooter />
    </Box>
  );
}
