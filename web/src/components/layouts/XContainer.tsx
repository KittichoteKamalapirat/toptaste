// import { Box } from "@mui/material";

import { Box, Container } from "@mui/material";
import React from "react";

interface XContainerProps {}

export const XContainer: React.FC<XContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Container maxWidth="md">
      <Box {...props}>{children}</Box>
    </Container>
  );
};
