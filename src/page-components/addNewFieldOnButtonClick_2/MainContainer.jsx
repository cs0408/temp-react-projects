import { Box, Container } from "@mui/material";
import React from "react";

const MainContainer = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Box>{children}</Box>
    </Container>
  );
};

export default MainContainer;
