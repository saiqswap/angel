import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { _switchPopup } from "../../actions/settingActions";
import {
  ENDPOINT_POST_USER_LOGIN,
  ENDPOINT_PUT_BLOCK_USER,
  ENDPOINT_PUT_DISABLE_GA_USER,
  ENDPOINT_PUT_UNBLOCK_USER,
} from "../../constants/endpoint";
import { USER_DOMAIN } from "../../settings";
import { post, put } from "../../utils/api";
import { checkScope } from "../../utils/auth";

export default function Actions({ data, _success }) {
  const dispatch = useDispatch();

  const _handleUpdateStatus = () => {
    if (data.status === "ACTIVE") {
      dispatch(
        _switchPopup({
          title: "Block user",
          content: "Are you sure for this action ",
          _handleSubmit: () => {
            put(`${ENDPOINT_PUT_BLOCK_USER}?userId=${data.id}`, {}, () => {
              toast("User is blocked");
              _success();
            });
          },
        })
      );
    } else {
      dispatch(
        _switchPopup({
          title: "Unblock user",
          content: "Are you sure for this action ",
          _handleSubmit: () => {
            put(`${ENDPOINT_PUT_UNBLOCK_USER}?userId=${data.id}`, {}, () => {
              toast("User is unblock");
              _success();
            });
          },
        })
      );
    }
  };

  const _handleDisableGA = () => {
    dispatch(
      _switchPopup({
        title: "Disable Google Authenticator",
        content: "Are you sure for this action ",
        _handleSubmit: () => {
          put(`${ENDPOINT_PUT_DISABLE_GA_USER}?userId=${data.id}`, {}, () => {
            toast("Disable GA success");
            _success();
          });
        },
      })
    );
  };

  //   const _handleActiveUser = () => {
  //     dispatch(
  //       _switchPopup({
  //         title: "Block user",
  //         content: "Are you sure for this action ",
  //         callback: () => {
  //           put(`/user-service/user/active/${data.id}`, {}, () => {
  //             toast("Active user success");
  //             _success();
  //           });
  //         },
  //       })
  //     );
  //   };

  const _handleLogin = () => {
    dispatch(
      _switchPopup({
        title: "Login account # " + data.id + " by token",
        content: "Are you for this action",
        _handleSubmit: () => {
          post(
            `${ENDPOINT_POST_USER_LOGIN}?userId=${data.id}`,
            {},
            (data) => {
              window.open(
                `${USER_DOMAIN}/login-by-token/${data.accessToken}`,
                "_blank"
              );
            },
            (error) => toast.error(error.msg)
          );
        },
      })
    );
  };

  return (
    checkScope("USER_FULL") && (
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              disabled={data.status === "NEW"}
              onClick={_handleUpdateStatus}
              variant="contained"
              color={data.status === "BLOCK" ? "primary" : "secondary"}
            >
              {data.status === "ACTIVE" ? "Block User" : "Unblock User"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={_handleDisableGA}
              variant="contained"
              color="inherit"
            >
              Disable GA
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={_handleLogin} variant="contained" color="primary">
              Login by token
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  );
}
