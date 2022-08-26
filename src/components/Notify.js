import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function Notify() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Notifications</Typography>
      </Grid>
      <Grid item xs={12}>
        Have 2 pending for withdraw
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        Have 2 pending for withdraw
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        Have 2 pending for withdraw
      </Grid>
    </Grid>
  );
}
