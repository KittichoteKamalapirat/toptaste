import { Box } from "@mui/material";
import React from "react";

interface XCenterProps {}

export const XCenter: React.FC<XCenterProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};
