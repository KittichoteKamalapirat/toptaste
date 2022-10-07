import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Pagination, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { DataGrid, GridRenderCellParams, GridFooter } from "@mui/x-data-grid";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { DeleteButton } from "./DeleteButton";
import Loading from "./Loading";
import LaunchIcon from "@mui/icons-material/Launch";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const RestaurantsTable = () => {
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  const handleDelete = async (postId: number) => {
    const { errors } = await deletePost({
      variables: {
        id: postId,
      },
      update: (cache) => {
        cache.evict({ id: "Post:" + postId });
        cache.evict({ fieldName: "allReviews" });
      },
    });

    if (errors) {
      console.log(errors);
    }
  };

  const {
    data: postsData,
    loading,
    error,
  } = usePostsQuery({
    variables: {
      limit: 100,
      cursor: null,
    },
  });

  //table

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "userId", headerName: "user id", width: 70 },
    {
      field: "title",
      headerName: "Restaurant Name",
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        const id = params.value.id;
        const title = params.value.title;
        return (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              navigate(`/restaurant/${id}`);
            }}
            startIcon={<LaunchIcon />}
          >
            <Typography noWrap variant="caption">
              {title}
            </Typography>
          </Button>
        );
      },
    },
    {
      field: "url",
      headerName: "Image",
      type: "number",
      width: 90,
      renderCell: (params: GridRenderCellParams<string>) => {
        return (
          <Avatar
            alt="user"
            src={params.value ? params.value : "/static/images/avatar/2.jpg"}
            sx={{ bgcolor: deepOrange[500] }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams<number>) => {
        return (
          <>
            <Link to={`/restaurant/${params.value}/update`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteButton
              handleDelete={() => handleDelete(params.value)}
              transparent={true}
            />
          </>
        );
      },
    },
  ];

  const rows = postsData?.posts.posts.map((post) => {
    return {
      id: post.id,
      title: { id: post.id, title: post.title },
      userId: post.creator.id,
      url: post.url,
      actions: post.id,
    };
  });
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h6" component="h2">
        Restaurants
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

//footer

export function CustomFooterStatusComponent(props: {
  status: "connected" | "disconnected";
}) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ margin: "10px", display: "flex", justifyContent: "space-between" }}
    >
      <Button
        startIcon={<AddBoxIcon style={{ color: "white" }} />}
        variant="contained"
        color="primary"
        onClick={() => navigate("/restaurant/create")}
      >
        <Typography
          variant="body1"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            color: "white",
          }}
        >
          Add new restaurant
        </Typography>
      </Button>
      <GridFooter />
    </Box>
  );
}
