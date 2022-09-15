import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ENDPOINT_REGISTER_EVENT } from "../../constants/endpoint";
import { get, put } from "../../utils/api";

export default function MemberCount() {
  const [memberCount, setMemberCount] = useState("");
  const [execNumber, setExecNumber] = useState("");
  const [execPerSeconds, setExecPerSeconds] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    get(ENDPOINT_REGISTER_EVENT, (data) => {
      setMemberCount(data.memberCount);
      setExecNumber(data.execNumber);
      setExecPerSeconds(data.execPerSeconds);
      setIsActive(data.isActive);
    });
  }, []);

  const _handleSubmit = () => {
    put(
      ENDPOINT_REGISTER_EVENT,
      {
        memberCount: parseInt(memberCount),
        execNumber: parseInt(execNumber),
        execPerSeconds: parseInt(execPerSeconds),
        isActive,
      },
      () => toast.success("Success")
    );
  };

  return (
    memberCount && (
      <Paper style={{ width: 500 }}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                label="Member count"
                fullWidth
                value={memberCount}
                onChange={(e) => setMemberCount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                label="Number of users increase each time"
                fullWidth
                value={execNumber}
                onChange={(e) => setExecNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                label="The number of seconds increments apart"
                fullWidth
                value={execPerSeconds}
                onChange={(e) => setExecPerSeconds(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={_handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    )
  );
}
