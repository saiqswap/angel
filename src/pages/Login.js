import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { setAccessToken, setScopes } from "../utils/auth";
import { get, post } from "../utils/api";
import { EMAIL_OTP_REQUIRED, GACODE_REQUIRED } from "../constants/errorCode";
import { ENDPOINT_GET_PROFILE, ENDPOINT_LOGIN } from "../constants/endpoint";
import GAConfirm from "../components/GAConfirm";
import OTPConfirm from "../components/OTPConfirm";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [gaCode, setGACode] = useState("");
  const [showOTP, setShowOtp] = useState(false);
  const [showGA, setIsShowGA] = useState(false);
  const [loading, setLoading] = useState(false);

  const _handleLogin = (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    post(
      ENDPOINT_LOGIN,
      {
        email,
        password,
        emailOtp,
        gaCode,
        device: "Trusted Device",
      },
      (data) => {
        setAccessToken(data.accessToken);
        setTimeout(() => {
          get(ENDPOINT_GET_PROFILE, (data) => {
            setScopes(data.scopes);
            window.location.reload();
          });
        }, 1000);
      },
      (error) => {
        setLoading(false);
        if (error.code === EMAIL_OTP_REQUIRED) {
          setIsShowGA(false);
          setShowOtp(true);
        } else if (error.code === GACODE_REQUIRED) {
          setIsShowGA(true);
          setShowOtp(false);
        } else toast.error(error.code, error.msg);
      }
    );
  };

  useEffect(() => {
    if (gaCode || emailOtp) _handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gaCode, emailOtp]);

  return (
    <Grid
      container
      style={{
        height: "100vh",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={11} md={6}>
        <Paper elevation={10}>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Container
                style={{ paddingTop: 100, paddingBottom: 100 }}
                maxWidth="sm"
              >
                <form onSubmit={_handleLogin}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h5" color="primary">
                        LOGIN
                      </Typography>
                      <Typography>
                        Sign in to Infinity Angel's admin dashboard
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="flex-start">
                        <Grid item xs={6}>
                          <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <CircularProgress size={24} />
                            ) : (
                              <span>Login</span>
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            </Grid>
            <Hidden only={["xs", "sm", "md"]}>
              <Grid
                item
                md={6}
                xs={12}
                style={{
                  backgroundImage: `url(/images/banner-bg.jpeg)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "left",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                }}
              ></Grid>
            </Hidden>
          </Grid>
        </Paper>
      </Grid>
      <GAConfirm
        open={showGA}
        _handleComplete={(e) => {
          setGACode(e);
        }}
      />
      <OTPConfirm
        open={showOTP}
        _handleComplete={(e) => {
          setEmailOtp(e);
        }}
      />
    </Grid>
  );
}
