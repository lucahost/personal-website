import React from "react";

import {
  List,
  ListItemIcon,
  ListItemText,
  Icon,
  colors,
  ListItemButton,
} from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

function ListItemLink({ ...props }) {
  return <ListItemButton component="a" {...props} />;
}
export const ProjectsList: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div style={{ color: colors.blueGrey[300] }}>
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
