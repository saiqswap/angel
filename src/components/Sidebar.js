import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useHistory } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { checkScope, logout } from "../utils/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Sidebar({
  open,
  routes,
  subRoutes,
  _handleDrawerClose,
  _handleDrawerOpen,
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={_handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to={`/`} className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
        </Link>
        <Divider />
        {routes.map((item, index) => (
          <RenderMenu
            item={item}
            key={index}
            openMenu={open}
            _handleDrawerOpen={_handleDrawerOpen}
          />
        ))}
        <Divider />
        {subRoutes.map((item, index) => (
          <RenderMenu
            item={item}
            key={index}
            openMenu={open}
            _handleDrawerOpen={_handleDrawerOpen}
          />
        ))}
        <Link to={`#`} className={classes.link} onClick={logout}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

function RenderMenu({ item, openMenu, isSub, _handleDrawerOpen }) {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!openMenu) {
      setOpen(false);
    }
  }, [openMenu]);

  useEffect(() => {
    if (openMenu && item.routes) {
      if (item.routes.filter((item) => item.path === pathname).length > 0) {
        setOpen(true);
      }
    }
  }, [openMenu, pathname, open, item.routes]);

  const _handleClick = () => {
    if (!open) {
      if (item.routes) {
        _handleDrawerOpen();
      }
    }
    setOpen(!open);
  };

  useEffect(() => {
    const { scope } = item;
    if (scope) {
      if (checkScope(scope)) {
        setShow(true);
      }
    } else {
      setShow(true);
    }
  }, [item]);

  return show ? (
    item.routes ? (
      <>
        {item.isBreak && <Divider />}
        <ListItem button onClick={_handleClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.routes.map((item, index) => (
              <RenderMenu
                item={item}
                key={index}
                openMenu={openMenu}
                isSub={true}
                _handleDrawerOpen={_handleDrawerOpen}
              />
            ))}
          </List>
        </Collapse>
      </>
    ) : (
      <>
        {item.isBreak && <Divider />}
        <Link to={item.path} className={classes.link}>
          <ListItem button>
            {!isSub && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.name} />
          </ListItem>
        </Link>
      </>
    )
  ) : null;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: "unset!important",
    color: "#000",
  },
}));
