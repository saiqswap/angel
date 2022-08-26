import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _getProfile } from "../../actions/adminActions";
import { _switchPopup } from "../../actions/settingActions";
import { ENDPOINT_GET_PUT_GA } from "../../constants/endpoint";
import { get, put } from "../../utils/api";

function GoogleAuthenticator() {
  const [gaEnable, setGaEnable] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state);
  const { profile } = admin;

  useEffect(() => {
    if (profile) {
      setGaEnable(profile.gaEnable);
    }
  }, [profile]);

  useEffect(() => {
    if (profile && !profile.gaEnable) {
      get(ENDPOINT_GET_PUT_GA, (data) => setQrCode(data));
    }
  }, [profile]);

  const _handleTurnOffGA = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const gaCode = e.target.gaCode.value;
    if (password.length < 1) {
      toast.error("Please enter your password");
    } else if (gaCode.length !== 6) {
      toast.error("Google authenticator code not valid");
    } else {
      dispatch(
        _switchPopup({
          title: "Google authenticator",
          content: "Are you sure to turn off Google Authenticator",
          _handleSubmit: () => {
            put(
              ENDPOINT_GET_PUT_GA,
              {
                gaCode,
                password,
                enable: false,
              },
              () => {
                toast.success("Turn off Google authenticator successfully");
                dispatch(_getProfile());
              }
            );
          },
        })
      );
    }
  };

  const _handleTurnOnGA = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const gaCode = e.target.gaCode.value;
    if (password.length < 1) {
      toast.error("Please enter your password");
    } else if (gaCode.length !== 6) {
      toast.error("Google authenticator code not valid");
    } else {
      dispatch(
        _switchPopup({
          title: "Google authenticator",
          content: "Are you sure to turn on Google Authenticator",
          _handleSubmit: () => {
            put(
              ENDPOINT_GET_PUT_GA,
              {
                gaCode,
                password,
                enable: true,
              },
              () => {
                toast.success("Turn on Google authenticator successfully");
                dispatch(_getProfile());
              }
            );
          },
        })
      );
    }
  };

  if (gaEnable) {
    return (
      <Grid item xs={4}>
        <Paper variant="outlined" style={{ height: "100%", padding: 20 }}>
          <form onSubmit={_handleTurnOffGA}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Turn Off Google Authenticator</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Password"
                  placeholder="Please enter your password"
                  id="password"
                  name="password"
                  style={{ width: 330 }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Google authenticator code"
                  placeholder="Please enter Google authenticator code"
                  id="gaCode"
                  name="gaCode"
                  style={{ width: 330 }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <Paper variant="outlined">
              {qrCode && (
                <>
                  <img
                    src={qrCode.qrCodeSetupImageUrl}
                    onLoad={() => setLoading(false)}
                    alt=""
                    width={300}
                    style={{
                      margin: "auto",
                    }}
                  />
                  <p style={{ textAlign: "center", marginTop: 0 }}>
                    {qrCode.manualEntryKey}
                  </p>
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper variant="outlined" style={{ height: "100%", padding: 20 }}>
              <form onSubmit={_handleTurnOnGA}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Turn On Google Authenticator</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      label="Password"
                      placeholder="Please enter your password"
                      id="password"
                      name="password"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Google authenticator code"
                      placeholder="Please enter Google authenticator code"
                      id="gaCode"
                      name="gaCode"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default GoogleAuthenticator;
