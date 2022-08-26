import { Button, Typography, TextField, Paper, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import { ENDPOINT_PUT_UPDATE_PASSWORD } from "../../constants/endpoint";
import { put } from "../../utils/api";
import { logout } from "../../utils/auth";

function ChangePassword() {
  const dispatch = useDispatch();

  const _handleChangePassword = (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (oldPassword.trim() === "") {
      toast.error("Please input old password");
    } else if (newPassword.trim().length < 8) {
      toast.error("Please input new password > 8 character");
    } else if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password not match");
    } else {
      dispatch(
        _switchPopup({
          title: "Change password",
          content: "Are you sure for this action",
          _handleSubmit: () => {
            put(
              ENDPOINT_PUT_UPDATE_PASSWORD,
              {
                oldPassword,
                password: newPassword,
              },
              () => {
                toast.success("Change password successfully");
                setTimeout(() => {
                  logout();
                }, 1000);
              }
            );
          },
        })
      );
    }
  };

  return (
    <Grid container>
      <Grid xs={4} item>
        <Paper variant="outlined" style={{ padding: "50px 20px" }}>
          <form noValidate onSubmit={_handleChangePassword}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Change password</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Old password"
                  name="oldPassword"
                  id="oldPassword"
                  type="password"
                  required
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New password"
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  required
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm password"
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  required
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
