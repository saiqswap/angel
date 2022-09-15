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
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FETCH_USER } from "../constants";
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
  const dispatch = useDispatch();

  return item.dateOfBirth ? (
    <Link to="#" onClick={_handleSelectKYC}>
      {email}
    </Link>
  ) : (
    <Box
      sx={{
        color: "#3f51b5",
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch({
          type: FETCH_USER,
          payload: id,
        });
      }}
    >
      <Typography type="button" variant="body2" value={id}>
        {email}
      </Typography>
    </Box>
  );
}
