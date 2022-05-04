import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";

import biergit from "./../../common/img/biergit.png";
import uno from "./../../common/img/uno.png";
import go from "./../../common/img/go.png";
import muuvy from "./../../common/img/muuvy.png";
import { Computer } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectContainer: {
      marginTop: theme.spacing(20),
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
  return <ListItem button component="a" {...props} />;
}

export const Projects: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.projectContainer}>
      <Typography className={classes.courier} variant="h4">
        My Projects
      </Typography>
      <Card className={classes.projectCard}>
        <CardContent>
          <List component="nav">
            <ListItemLink href="/">
              <ListItemIcon>
                <Computer />
              </ListItemIcon>
              <ListItemText primary="Website" />
            </ListItemLink>
            <ListItemLink href="https://github.com/biergit-ch" target="_blank">
              <ListItemIcon>
                <img
                  src={biergit}
                  className={classes.projectAvatar}
                  alt="biergit"
                />
              </ListItemIcon>
              <ListItemText primary="BierGit" />
            </ListItemLink>
            <ListItemLink href="https://github.com/muuvy" target="_blank">
              <ListItemIcon>
                <img
                  src={muuvy}
                  className={classes.projectAvatar}
                  alt="muuvy"
                />
              </ListItemIcon>
              <ListItemText primary="Muuvy" />
            </ListItemLink>
            <ListItemLink
              href="https://github.com/booooza/swe2-uno"
              target="_blank"
            >
              <ListItemIcon>
                <img src={uno} className={classes.projectAvatar} alt="UNO" />
              </ListItemIcon>
              <ListItemText primary="UNO" />
            </ListItemLink>
            <ListItemLink href="https://go.hostettler.io" target="_blank">
              <ListItemIcon>
                <img src={go} className={classes.projectAvatar} alt="GO" />
              </ListItemIcon>
              <ListItemText primary="GO" />
            </ListItemLink>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};
