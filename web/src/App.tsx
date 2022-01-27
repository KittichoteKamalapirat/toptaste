import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/admin" element={<AdminDashboard />} />

            {/* user */}
            <Route path="/register" element={<Register />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id/update" element={<UpdateUser />} />

            {/* post */}
            <Route path="/restaurant/create" element={<CreatePost />} />
            <Route path="/restaurant/:id" element={<Post />} />
            <Route path="/restaurant/:id/update" element={<UpdatePost />} />

            {/* review */}
            <Route
              path="/restaurant/:id/review/create"
              element={<CreateReview />}
            />
            <Route
              path="/restaurant/:postId/review/:reviewId/update"
              element={<UpdateReview />}
            />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
