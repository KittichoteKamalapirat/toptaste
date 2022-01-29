import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

export const AuthRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminRoutes = () => {
  const { currentUser } = useContext(UserContext);
  console.log("admin routes");
  console.log({ currentUser });
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/" />;
};
