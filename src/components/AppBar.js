import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect } from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import Notify from "./Notify";
import { useDispatch } from "react-redux";
import { _getContracts, _getProfile } from "../actions/adminActions";
import { _getConfig } from "../actions/settingActions";

function emailToName(email) {
  const index = email.indexOf("@");
  return email.slice(0, index);
}

export default function CustomAppBar({ open, _handleDrawerOpen }) {
  const classes = useStyles();
  const { admin } = useSelector((state) => state);
  const { profile } = admin;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getProfile());
    dispatch(_getConfig());
    dispatch(_getContracts());
  }, [dispatch]);

  // const _handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const showNotify = Boolean(anchorEl);
  const id = showNotify ? "simple-popover" : undefined;

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      color="primary"
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={_handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Avatar src="/logo.png" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                {/* <IconButton onClick={_handleClick} aria-describedby={id}>
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon style={{ fill: "#fff" }} />
                  </Badge>
                </IconButton> */}
                <Popover
                  id={id}
                  open={showNotify}
                  anchorEl={anchorEl}
                  onClose={_handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  className="notify"
                >
                  <Notify />
                </Popover>
              </Grid>
              <Grid item>
                <Avatar>{profile && profile.email.charAt(0)}</Avatar>
              </Grid>
              <Grid item>
                <div style={{ marginBottom: -7 }}>
                  {profile && emailToName(profile.email)}
                </div>
                <small style={{ fontSize: 10 }}>
                  {profile && profile.role}
                </small>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#17222d",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));
