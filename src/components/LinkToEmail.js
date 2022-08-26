import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENDPOINT_POST_USER_LIST } from "../constants/endpoint";
import { formatAddress } from "../settings/format";
import { post } from "../utils/api";

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

export default function LinkToEmail({ id, email, item, _handleSelectKYC }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    post(
      ENDPOINT_POST_USER_LIST,
      {
        page: 1,
        pageSize: 1,
        responseMeta: false,
        filters: {
          id,
        },
      },
      (data) => {
        if (anchorEl) {
          const { itemCount, items } = data;
          if (itemCount > 0) {
            setData(items[0]);
          } else {
            console.log("Not found");
          }
        }
      }
    );
  }, [anchorEl, id]);

  const _handleHover = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const cid = open ? "simple-popper" : undefined;

  return item.dateOfBirth ? (
    <Link to="#" onClick={_handleSelectKYC}>
      {email}
    </Link>
  ) : (
    <div onMouseLeave={_handleClose}>
      <Link to={`/user/detail/${id}`} target="_blank">
        <Typography
          aria-describedby={cid}
          type="button"
          onMouseEnter={_handleHover}
          variant="body2"
          value={id}
        >
          {email}
        </Typography>
      </Link>
      <Popper
        id={cid}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 9999 }}
      >
        <Paper>
          <Box p={2} width={300}>
            {data ? (
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  {data && <Avatar {...stringAvatar(data.email)} />}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    ID: #{data && data.id}
                  </Typography>
                  <Typography variant="body2">
                    Address: {data && formatAddress(data.address)}
                  </Typography>
                  <Typography variant="body2">
                    Email: {data && data.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
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
                    Google authentication:{" "}
                    {data && (
                      <CheckCircleOutline
                        color={data.gaEnable ? "primary" : "inherit"}
                        style={{ fontSize: "1.1em" }}
                      />
                    )}{" "}
                  </Typography>
                  <Typography variant="body2">
                    Join time:{" "}
                    {data && moment(data.createdTime).format("YYYY-MM-DD")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Affiliate ID: #{data && data.referralId}
                  </Typography>
                  <Typography variant="body2">
                    Sponsor: {data && data.sponsorUsername}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} align="center">
                  <Link to={`/user/detail/${id}`} target="_blank">
                    Show more
                  </Link>
                </Grid>
              </Grid>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress size={24} />
              </div>
            )}
          </Box>
        </Paper>
      </Popper>
    </div>
  );
}
