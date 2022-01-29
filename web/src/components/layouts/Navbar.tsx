import { useApolloClient } from "@apollo/client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../generated/graphql";
import { theme } from "../../theme";
import { UserContext } from "../../util/UserContext";

const pages = ["Products", "Pricing", "Blog"];

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem("user", "null");
    setCurrentUser(null); //trigger useEffect

    await logout(); //redis removed -> mequery wouldn't work now
    navigate("/");
    await apolloClient.resetStore();
    setCurrentUser(null); //again
  };

  //material
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, flexGrow: 1 }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              LOGO
            </Link>
          </Typography>

          {/* large */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {currentUser ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {currentUser.isAdmin && (
                  <>
                    <Button
                      startIcon={<AddBoxIcon style={{ color: "white" }} />}
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate("/restaurant/create")}
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
                        Add
                      </Typography>
                    </Button>

                    <Button
                      startIcon={<DashboardIcon style={{ color: "white" }} />}
                      variant="outlined"
                      color="inherit"
                      onClick={() => navigate("/admin")}
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
                        Dashboard
                      </Typography>
                    </Button>
                  </>
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {currentUser.isAdmin ? (
                    <Badge badgeContent="Admin" color="secondary">
                      <Avatar
                        alt={currentUser.username}
                        src="/static/images/avatar/2.jpg"
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                    </Badge>
                  ) : (
                    <Avatar
                      alt={currentUser.username}
                      src="/static/images/avatar/2.jpg"
                      sx={{ bgcolor: deepOrange[500] }}
                    />
                  )}

                  {/* <Typography color="white">
                    {" "}
                    Welcome, {meData?.me?.username}{" "}
                  </Typography> */}
                </Box>

                <Button
                  onClick={handleLogout}
                  variant="text"
                  color="inherit"
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button onClick={() => navigate("/register")} variant="text">
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
                    Sign up
                  </Typography>
                </Button>

                <Button onClick={() => navigate("/login")} variant="text">
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
                    Login
                  </Typography>
                </Button>
              </Box>
            )}
          </Box>

          {/* small */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              //   size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {currentUser ? (
                <Box>
                  <MenuItem onClick={handleLogout}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {" "}
                      <LogoutIcon />
                      <Typography>Logout</Typography>
                    </Box>
                  </MenuItem>

                  {/* <MenuItem>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FaceIcon />
                      <Typography> My Profile</Typography>
                    </Box>
                  </MenuItem> */}

                  <MenuItem onClick={() => navigate("/restaurant/create")}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AddBoxIcon />
                      <Typography> Add restaurant</Typography>
                    </Box>
                  </MenuItem>

                  {currentUser.isAdmin && (
                    <MenuItem onClick={() => navigate("/admin")}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AddBoxIcon />
                        <Typography> Go to dashboard</Typography>
                      </Box>
                    </MenuItem>
                  )}

                  {/* <MenuItem>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography> Welcome, {meData?.me?.username}</Typography>
                    </Box>
                  </MenuItem> */}
                </Box>
              ) : (
                <Box>
                  <MenuItem>
                    <Link to="register" style={{ textDecoration: "none" }}>
                      <Typography>Sign up</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography>Login</Typography>
                    </Link>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
