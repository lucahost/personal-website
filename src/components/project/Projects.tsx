import React from "react";

import {
  List,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Typography,
  Container,
  ListItemSecondaryAction,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import biergit from "./../../common/img/biergit.png";
import uno from "./../../common/img/uno.png";
import go from "./../../common/img/go.png";
import muuvy from "./../../common/img/muuvy.png";
import portal from "./../../common/img/portal.png";
import drugstore from "./../../common/img/drugstore.png";
import network from "./../../common/img/network.png";
import smartContracts from "./../../common/img/smartContracts.png";
import { Computer, PictureAsPdf } from "@mui/icons-material";

const useStyles = makeStyles((theme) =>
  createStyles({
    projectContainer: {
      marginTop: theme.spacing(9),
      width: "100%",
    },
    projectCard: {
      marginTop: theme.spacing(4),
      color: "black",
    },
    courier: {
      fontFamily: ["Courier New"].join(","),
      textAlign: "center",
    },
    projectAvatar: {
      width: "25px",
      height: "25px",
    },
  })
);
function ListItemLink({ ...props }) {
  return <ListItemButton component="a" {...props} />;
}

export const Projects: React.FC<React.PropsWithChildren<unknown>> = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.projectContainer}>
      <Typography className={classes.courier} variant="h4">
        My Projects
      </Typography>
      <Card className={classes.projectCard}>
        <CardContent>
          <List component="nav" style={{ maxHeight: 750, overflow: "auto" }}>
            <ListItemLink href="/">
              <ListItemIcon>
                <Computer />
              </ListItemIcon>
              <ListItemText primary="Website" secondary="React" />
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/bachelor-thesis"
              target="_blank"
            >
              <ListItemIcon>
                <img
                  src={smartContracts}
                  className={classes.projectAvatar}
                  alt="Bachelor Thesis"
                />
              </ListItemIcon>
              <ListItemText
                primary="Quantitative Analysis of Graph Metrics (2023)"
                secondary="Network-Analysis / Data-Science / Paper"
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="s-c-file-open"
                  href="https://hostettler.io/static/media/thesis-hostettler.pdf"
                  target="_blank"
                >
                  <PictureAsPdf />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/eth-smart-contracts"
              target="_blank"
            >
              <ListItemIcon>
                <img
                  src={smartContracts}
                  className={classes.projectAvatar}
                  alt="Smart-Contracts"
                />
              </ListItemIcon>
              <ListItemText
                primary="Smart-Contracts (2022)"
                secondary="Solidity / React / Paper"
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="s-c-file-open"
                  href="https://hostettler.io/static/media/smart-contracts.pdf"
                  target="_blank"
                >
                  <PictureAsPdf />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/portal-vr"
              target="_blank"
            >
              <ListItemIcon>
                <img
                  src={portal}
                  className={classes.projectAvatar}
                  alt="Portal-VR"
                />
              </ListItemIcon>
              <ListItemText
                primary="Portal-VR (2021 - 2022)"
                secondary="C# / Unity"
              />
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/network-analysis"
              target="_blank"
            >
              <ListItemIcon>
                <img
                  src={network}
                  className={classes.projectAvatar}
                  alt="Network-Analysis"
                />
              </ListItemIcon>
              <ListItemText
                primary="Network-Analysis (2021 - 2022)"
                secondary="Python / Paper"
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="na-file-open"
                  href="https://hostettler.io/static/media/network-analysis.pdf"
                  target="_blank"
                >
                  <PictureAsPdf />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemLink>
            <ListItemLink
              href="https://github.com/lucahost/drugstore"
              target="_blank"
            >
              <ListItemIcon>
                <img
                  src={drugstore}
                  className={classes.projectAvatar}
                  alt="drugstore"
                />
              </ListItemIcon>
              <ListItemText
                primary="Drugstore (2021 - 2022)"
                secondary="Java Android App"
              />
            </ListItemLink>
            <ListItemLink href="https://go.hostettler.io" target="_blank">
              <ListItemIcon>
                <img src={go} className={classes.projectAvatar} alt="GO" />
              </ListItemIcon>
              <ListItemText
                primary="GO (2021)"
                secondary="NextJs / WebWorkers"
              />
            </ListItemLink>
            <ListItemLink href="https://github.com/biergit-ch" target="_blank">
              <ListItemIcon>
                <img
                  src={biergit}
                  className={classes.projectAvatar}
                  alt="biergit"
                />
              </ListItemIcon>
              <ListItemText
                primary="BierGit (2019 - 2020)"
                secondary="Sprint Boot / React"
              />
            </ListItemLink>
            <ListItemLink
              href="https://github.com/booooza/swe2-uno"
              target="_blank"
            >
              <ListItemIcon>
                <img src={uno} className={classes.projectAvatar} alt="UNO" />
              </ListItemIcon>
              <ListItemText primary="UNO (2019)" secondary="JavaFx" />
            </ListItemLink>
            <ListItemLink href="https://github.com/muuvy" target="_blank">
              <ListItemIcon>
                <img
                  src={muuvy}
                  className={classes.projectAvatar}
                  alt="muuvy"
                />
              </ListItemIcon>
              <ListItemText primary="Muuvy (2019)" secondary="Vaadin" />
            </ListItemLink>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};
