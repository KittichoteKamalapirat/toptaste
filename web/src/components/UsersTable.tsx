import { gql } from "@apollo/client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridFooter, GridRenderCellParams } from "@mui/x-data-grid";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useMakeAdminMutation,
  useUsersQuery,
} from "../generated/graphql";
import { UserContext } from "../util/UserContext";
import { DeleteButton } from "./DeleteButton";
import Loading from "./Loading";

export const UsersTable = () => {
  const { data: usersData, loading, error } = useUsersQuery();
  const [makeAdmin] = useMakeAdminMutation();
  const { currentUser } = React.useContext(UserContext);

  const [deleteUser] = useDeleteUserMutation();

  // snack bar
  const [adminOpen, setAdminOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteOpen(false);
    setAdminOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleDelete = async (userId: number) => {
    const { errors } = await deleteUser({
      variables: {
        id: userId,
      },
      update: (cache) => {
        cache.evict({ id: "User:" + userId });
      },
    });

    setDeleteOpen(true);

    if (errors) {
      console.log(errors);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "username", headerName: "username", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Admin",
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        const userId = params.value.userId;
        const isAdmin = params.value.isAdmin;
        return (
          <>
            <Button
              startIcon={isAdmin ? <ToggleOnIcon /> : <ToggleOffIcon />}
              variant="outlined"
              color={isAdmin ? "primary" : "secondary"}
              disabled={userId === currentUser.id && true}
              onClick={async () => {
                console.log("hi");
                try {
                  await makeAdmin({
                    variables: {
                      id: userId,
                      beAdmin: !isAdmin,
                    },
                    update: (cache, { data }) => {
                      cache.writeFragment({
                        id: "User:" + userId,
                        fragment: gql`
                          fragment __ on User {
                            isAdmin
                          }
                        `,
                        data: { isAdmin: !isAdmin },
                      });
                    },
                  });
                } catch (error) {
                  console.log(error);
                  setAdminOpen(true);
                }
              }}
            >
              {isAdmin ? "True" : "False"}
            </Button>

            <Snackbar
              open={adminOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert severity="error" onClose={handleClose} action={action}>
                Cannot assign oneself
              </Alert>
            </Snackbar>

            <Snackbar
              open={deleteOpen}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert severity="success" onClose={handleClose} action={action}>
                Successfully delete a user
              </Alert>
            </Snackbar>
          </>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        const userId = params.value.userId;
        const username = params.value.username;
        return (
          <>
            <Link
              to={`/user/${userId}/update`}
              data-test={`edit user: ${username}`}
            >
              <EditIcon color="primary" />
            </Link>
            <DeleteButton
              handleDelete={() => handleDelete(userId)}
              transparent={true}
              data-test={`delete user: ${username}`}
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
      role: { isAdmin: user.isAdmin, userId: user.id },
      actions: { userId: user.id, username: user.username },
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
  const navigate = useNavigate();
  return (
    <Box
      sx={{ margin: "10px", display: "flex", justifyContent: "space-between" }}
    >
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
            color: "white",
          }}
        >
          Add new user
        </Typography>
      </Button>
      <GridFooter />
    </Box>
  );
}
