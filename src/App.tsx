import { BrowserRouter as Router } from "react-router-dom";
import { Typography } from "@mui/material";
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

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppInsightsContext.Provider value={reactPlugin}>
        <Router>
          <main style={{
            marginTop: theme.spacing(8),
          }}>
            <HomeRoutes />
          </main>
          <footer style={{ position: "fixed", bottom: theme.spacing(2), width: "100%", textAlign: "center" }}>
            <Typography>
              Made with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              in <b>Zurich</b>
            </Typography>
          </footer>
        </Router>
      </AppInsightsContext.Provider>
    </ThemeProvider>
  );
}
