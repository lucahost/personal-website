import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  List,
  ListItemIcon,
  ListItemText,
  Icon,
  ListItem,
} from "@material-ui/core";
import { GitHub, LinkedIn } from "@material-ui/icons";

const useStyles = makeStyles(() =>
  createStyles({
    projectContainer: {
      color: "black",
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
export const ProjectsList: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.projectContainer}>
      <List component="nav">
        <ListItemLink href="/">
          <ListItemIcon>
            <Icon>computer</Icon>
          </ListItemIcon>
          <ListItemText primary="Website" />
        </ListItemLink>
        <ListItemLink href="https://github.com/lucahost" target="_blank">
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
        </ListItemLink>
        <ListItemLink
          href="https://www.linkedin.com/in/lucahostettler/"
          target="_blank"
        >
          <ListItemIcon>
            <LinkedIn />
          </ListItemIcon>
          <ListItemText primary="LinkedIn" />
        </ListItemLink>
        <ListItemLink href="https://blog.lucahost.dev" target="_blank">
          <ListItemIcon>
            <Icon>rss_feed</Icon>
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemLink>
      </List>
    </div>
  );
};
