import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
