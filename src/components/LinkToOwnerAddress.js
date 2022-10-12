import { Box, IconButton, Typography } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FETCH_USER } from "../constants";
import { formatAddress_1 } from "../settings/format";

export default function LinkToOwnerAddress({ id, address, item }) {
  const dispatch = useDispatch();

  return (
    <Box display="flex" alignItems="center">
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
          {formatAddress_1(address)}
        </Typography>
      </Box>
      <IconButton
        onClick={() => {
          toast.success("Copied");
          navigator.clipboard.writeText(address);
        }}
        size="small"
      >
        <FileCopy fontSize="small" />
      </IconButton>
    </Box>
  );
}
