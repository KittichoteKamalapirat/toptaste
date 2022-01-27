import { createContext } from "react";
import { User } from "../generated/graphql";

export interface CurrentUserContext {
  currentUser: User;
  setCurrentUser: () => void;
}
export const UserContext = createContext<any>(null);
