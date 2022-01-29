import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

import { theme } from "./theme";
import Navbar from "./components/layouts/Navbar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost";
import { CssBaseline, ThemeProvider } from "@mui/material/";
import { Post } from "./pages/Post";
import { CreateReview } from "./pages/CreateReview";
import { UpdatePost } from "./pages/UpdatePost";
import { UpdateReview } from "./pages/UpdateReview";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AppContainer } from "./components/layouts/AppContainer";
import { UpdateUser } from "./pages/UpdateUser";
import { CreateUser } from "./pages/CreateUser";
import { CurrentUserContext, UserContext } from "./util/UserContext";
import { useMeQuery, User } from "./generated/graphql";
import Loading from "./components/Loading";
import { AuthRoutes, AdminRoutes } from "./util/ProtectedRoutes";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const { data, loading } = useMeQuery();

  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    let userObj = null;
    if (user) {
      userObj = JSON.parse(user);
    }

    setCurrentUser(userObj);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    if (data?.me) {
      setCurrentUser(data?.me as User);
    }
  }, [currentUser, data?.me]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserContext.Provider value={value as CurrentUserContext | null}>
          <Navbar />
          <AppContainer>
            <Routes>
              {/* Anyone routes */}
              <Route path="/" element={<Home />} />
              {/* post */}
              <Route path="/restaurant/:id" element={<Post />} />
              {/* user */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* regular user can  create a review */}
              {/* regular user protected routes */}
              <Route element={<AuthRoutes />}>
                <Route
                  path="/restaurant/:id/review/create"
                  element={<CreateReview />}
                />
              </Route>
              {/* admin protected routes */}
              <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<AdminDashboard />} />

                {/* user */}
                <Route path="/user/create" element={<CreateUser />} />
                <Route path="/user/:id/update" element={<UpdateUser />} />

                {/* post */}
                <Route path="/restaurant/create" element={<CreatePost />} />

                <Route path="/restaurant/:id/update" element={<UpdatePost />} />

                {/* review */}
                <Route
                  path="/restaurant/:postId/review/:reviewId/update"
                  element={<UpdateReview />}
                />
              </Route>
              <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
          </AppContainer>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
