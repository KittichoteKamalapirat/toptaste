import { Box } from "@mui/material";
import React from "react";

interface XYCenterProps {}

export const XYCenter: React.FC<XYCenterProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      {children}
    </Box>
  );
};
