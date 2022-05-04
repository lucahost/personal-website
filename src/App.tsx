/* eslint-disable prettier/prettier */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import NavigationDrawer from "./common/NavigationDrawer";
import HomeRoutes from "./HomeRoutes";
import { AppInsightsContext, ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100vh",
      flexDirection: "column",
      display: "flex",
      minHeight: "-webkit-fill-available",
    },
    main: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      height: "100%",
    },
    footer: {
      padding: theme.spacing(4),
      marginTop: "auto",
      textAlign: "center",
    },
  })
);

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: "00e2b360-d361-4bf6-90d1-1245dd60fa93",
    extensions: [reactPlugin],
    enableAutoRouteTracking: true
  },
});
appInsights.loadAppInsights();

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <div className={classes.root}>
        <Router>
          <Container component="main" maxWidth={false} className={classes.main}>
            <NavigationDrawer />
            <HomeRoutes />
          </Container>
          <footer className={classes.footer}>
            <Container maxWidth="sm">
              <Typography>
                Made with{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                in <b>Zurich</b>
              </Typography>
            </Container>
          </footer>
        </Router>
      </div>
    </AppInsightsContext.Provider>
  );
};

export default App;
