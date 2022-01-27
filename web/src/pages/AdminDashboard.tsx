import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { RestaurantsTable } from "../components/RestaurantsTable";
import { ReviewsTable } from "../components/ReviewsTable";
import { UsersTable } from "../components/UsersTable";

interface AdminDashboardProps {}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
      <Box sx={{ width: "90%" }}>
        <Typography variant="h5" component="h1" marginBottom={4}>
          Admin Dashboard
        </Typography>
        <Grid container rowSpacing={10} columnSpacing={1}>
          <Grid item xs={12} lg={4}>
            <RestaurantsTable />
          </Grid>
          <Grid item xs={12} lg={4}>
            <UsersTable />
          </Grid>
          <Grid item xs={12} lg={4}>
            <ReviewsTable />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
