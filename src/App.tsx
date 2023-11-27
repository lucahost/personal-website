import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import NavigationDrawer from "./common/NavigationDrawer";
import HomeRoutes from "./HomeRoutes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  AppInsightsContext,
  ReactPlugin,
} from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import theme from "./theme";

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: "00e2b360-d361-4bf6-90d1-1245dd60fa93",
    extensions: [reactPlugin],
    enableAutoRouteTracking: true,
  },
});
appInsights.loadAppInsights();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppInsightsContext.Provider value={reactPlugin}>
        <div
          style={{
            flexGrow: 1,
            height: "100vh",
            flexDirection: "column",
            display: "flex",
            minHeight: "-webkit-fill-available",
          }}
        >
          <Router>
            <Container
              component="main"
              maxWidth={false}
              sx={{
                mt: theme.spacing(4),
                mb: theme.spacing(2),
                height: "100%",
              }}
            >
              <NavigationDrawer />
              <HomeRoutes />
            </Container>
            <footer
              style={{
                padding: theme.spacing(2),
                marginTop: "auto",
                textAlign: "center",
              }}
            >
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
    </ThemeProvider>
  );
}
