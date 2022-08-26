import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export default function RequireForAdmin() {
  const { admin } = useSelector((state) => state);
  const { profile } = admin;
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [pathname, setPathname] = useState(history.location.pathname);

  useEffect(() => {
    if (profile) {
      if (
        (!profile.changePasswordRequired && profile.gaEnable) ||
        pathname === "/setting/change-password" ||
        pathname === "/setting/google-authenticator"
      ) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }, [pathname, profile]);

  useEffect(() => {
    if (profile.changePasswordRequired || !profile.gaEnable) {
      history.listen(({ pathname }) => {
        console.log(pathname);
        setPathname(pathname);
      });
    }
  }, [history, profile]);

  return (
    <Dialog
      maxWidth="lg"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle>To use admin, please do the following actions</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <CheckCircleOutline
                  fontSize="medium"
                  color={
                    profile && !profile.changePasswordRequired
                      ? "primary"
                      : "disabled"
                  }
                />
              </Grid>
              <Grid item>
                <Link
                  style={{ textDecoration: "underline" }}
                  to="/setting/change-password"
                >
                  <Typography>Change password</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <CheckCircleOutline
                  fontSize="medium"
                  color={profile && profile.gaEnable ? "primary" : "disabled"}
                />
              </Grid>
              <Grid item>
                <Link
                  style={{ textDecoration: "underline" }}
                  to="/setting/google-authenticator"
                >
                  <Typography>Turn on Google Authentication</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
