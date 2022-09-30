import { makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NewDashboard from "../pages/NewDashboard";
import UserDetail from "../pages/user/UserDetail";

export default function Routes({ routes, subRoutes }) {
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
        {subRoutes.map((route, i) =>
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
        <Route path="/user/detail/:userId" component={UserDetail} />
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
