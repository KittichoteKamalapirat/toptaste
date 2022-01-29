import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { XYCenter } from "./layouts/XYCenter";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <XYCenter>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    </XYCenter>
  );
};

export default Loading;
