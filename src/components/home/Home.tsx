import React, { useState, useEffect } from "react";
import luca from "./../../common/img/luca.png";
import {
  Grid,
  Container,
  Fade,
  Input,
  useTheme,
  colors,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Computer, GitHub, LinkedIn } from "@mui/icons-material";
import {
  ReactPlugin,
  useAppInsightsContext,
  useTrackMetric,
} from "@microsoft/applicationinsights-react-js";
import { CodeTypography } from "../../common/CodeTypography";
import twitterX from "./../../common/img/twitterX.png";

export const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const [blink, setBlink] = useState(true);

  const appInsightsContext = useAppInsightsContext();
  useTrackMetric(appInsightsContext, "Home");

  useEffect(() => {
    setTimeout(() => {
      setBlink(!blink);
    }, 350);
  });

  const inputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    appInsights: ReactPlugin,
  ) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      console.log(`Enter key was pressed. ${event.currentTarget.value}.`);
      event.preventDefault();
      appInsights.trackEvent({
        name: "Home Enter Key",
        properties: {
          text: event.currentTarget.value,
        },
      });
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: theme.spacing(8),
        fontSize: "calc(10px + 2vmin)",
        color: colors.grey[200],
        textAlign: "center",
        fontFamily: "Courier New",
      }}
    >
      <Grid item xs={12}>
        <img
          src={luca}
          style={{ height: "10vmin", pointerEvents: "none" }}
          alt="logo"
        />
      </Grid>
      <Grid item xs={12}>
        <CodeTypography>
          Hi{" "}
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          I&apos;m <b>Luca Hostettler</b>
        </CodeTypography>
      </Grid>
      <Grid item xs={12}>
        <CodeTypography>
          Coding is my passion{" "}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </CodeTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          textAlign: "left",
        }}
      >
        <Container maxWidth="xs">
          <List dense={true}>
            <ListItem>
              <ListItemIcon color="white">
                <Computer color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <Link href="/projects">
                  <CodeTypography>Projects</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GitHub color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <Link
                  href="https://github.com/lucahost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeTypography>GitHub</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LinkedIn color="secondary" sx={{ minWidth: "0px" }} />
              </ListItemIcon>
              <ListItemText>
                <Link
                  href="https://www.linkedin.com/in/lucahostettler/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeTypography>LinkedIn</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img
                  src={twitterX}
                  alt="Twitter"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <Link
                  href="https://twitter.com/luca_host"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeTypography>Twitter</CodeTypography>
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="center">
          <CodeTypography>
            <span>fsociety~# </span>
            <Fade in={blink}>
              <span>_</span>
            </Fade>
          </CodeTypography>
          <Input
            type="text"
            onKeyDown={(event) => inputKeyDown(event, appInsightsContext)}
            disableUnderline
            style={{
              width: "10%",
              fontSize: "calc(10px + 2vmin)",
              fontFamily: "Courier New",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
