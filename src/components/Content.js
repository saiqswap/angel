import { makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NewDashboard from "../pages/NewDashboard";
import FeedDetail from "../pages/nft/FeedDetail";
import UserDetail from "../pages/user/UserDetail";
import VerificationView from "../pages/user/VerificationView";

export default function Routes({ routes }) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        {routes.map((route, i) =>
          route.routes ? (
            route.routes.map((route, i) => (
              <Route
                path={route.path}
                key={i}
                component={route.component}
                exact={route.exact}
              />
            ))
          ) : (
            <Route
              path={route.path}
              key={i}
              component={route.component}
              exact={route.exact}
            />
          )
        )}
        <Route path="/user/verification/:id" component={VerificationView} />
        <Route path="/user/detail/:userId" component={UserDetail} />
        <Route path="/feed/detail/:token" component={FeedDetail} />
        <Route path="*" component={NewDashboard} />
      </Switch>
    </main>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
  },
}));
