import { ChildFriendly } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";

interface AppContainerProps {}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return <Box marginY={10}>{children}</Box>;
};
