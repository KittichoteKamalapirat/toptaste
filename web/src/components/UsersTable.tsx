import EditIcon from "@mui/icons-material/Edit";
import { deepOrange } from "@mui/material/colors";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
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
import AddBoxIcon from "@mui/icons-material/AddBox";

export const UsersTable = () => {
  const { data: usersData, loading, error } = useUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (userId: number) => {
    const { errors } = await deleteUser({
      variables: {
        id: userId,
      },
      update: (cache) => {
        cache.evict({ id: "User:" + userId });
      },
    });

    if (errors) {
      console.log(errors);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "username", headerName: "username", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Admin", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams<number>) => {
        return (
          <>
            <Link to={`/user/${params.value}/update`}>
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

  const rows = usersData?.users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.isAdmin,
      actions: user.id,
    };
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h6" component="h2">
        Users
      </Typography>
      <DataGrid
        rows={rows!}
        columns={columns}
        pageSize={5}
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
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: "10px", display: "flex" }}>
      <Button
        startIcon={<AddBoxIcon style={{ color: "white" }} />}
        variant="contained"
        color="primary"
        onClick={() => navigate("/user/create")}
      >
        <Typography
          variant="body1"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            alignSelf: "flex-end",
            color: "white",
          }}
        >
          Add new user
        </Typography>
      </Button>
    </Box>
  );
}
