import { Avatar, Box, Grid, Paper, Typography } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { formatAddress } from "../../settings/format";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  return {
    style: {
      width: 70,
      height: 70,
      margin: "auto",
      backgroundColor: stringToColor(name),
    },
    children: `${name.substr(0, 1).toUpperCase()}`,
  };
}

export default function Info({ data }) {
  return (
    <Grid item xs={12}>
      <Paper
        style={{
          padding: 20,
        }}
        variant="outlined"
      >
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={1}>
            {data && <Avatar {...stringAvatar(data.email)} />}
          </Grid>
          <Grid item xs={5}>
            <Box pl={2}>
              <Typography variant="body2">ID: #{data && data.id}</Typography>
              <Typography variant="body2">
                Email: {data && data.email}
              </Typography>
              <Typography variant="body2">
                Address: {data && formatAddress(data.address)}
              </Typography>
              <Typography variant="body2">
                Join time:{" "}
                {data && moment(data.createdTime).format("YYYY-MM-DD")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Status:{" "}
              {data && (
                <CheckCircleOutline
                  color={data.status === "ACTIVE" ? "primary" : "inherit"}
                  style={{ fontSize: "1.1em" }}
                />
              )}
            </Typography>
            <Typography variant="body2">
              Google authentication:
              {data && (
                <CheckCircleOutline
                  color={data.gaEnable ? "primary" : "inherit"}
                  style={{ fontSize: "1.1em" }}
                />
              )}
            </Typography>
            <Typography variant="body2">
              Affiliate ID: #{data && data.referralId}
            </Typography>
            <Typography variant="body2">
              Affiliate: {data && data.sponsorUsername}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Game status: {data.gameStatus}
            </Typography>
            <Typography variant="body2">
              R-I slot: {data.limitRiSlot}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
