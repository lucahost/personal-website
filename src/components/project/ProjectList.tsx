import React from 'react';

import biergit from './../../common/img/biergit.png';
import uno from './../../common/img/uno.png';
import muuvy from './../../common/img/muuvy.png';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  ListItemIcon,
  ListItemText,
  Icon,
  ListItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectContainer: {
      color: 'black',
    },
    projectAvatar: {
      width: '25px',
      height: '25px',
    },
  }),
);
function ListItemLink(props: any) {
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
        <ListItemLink href="https://blog.lucahost.dev">
          <ListItemIcon>
            <Icon>rss_feed</Icon>
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemLink>
        <ListItemLink href="https://biergit.ch">
          <ListItemIcon>
            <img
              src={biergit}
              className={classes.projectAvatar}
              alt="biergit"
            />
          </ListItemIcon>
          <ListItemText primary="biergit" />
        </ListItemLink>
        <ListItemLink href="https://github.com/muuvy">
          <ListItemIcon>
            <img src={muuvy} className={classes.projectAvatar} alt="muuvy" />
          </ListItemIcon>
          <ListItemText primary="muuvy" />
        </ListItemLink>
        <ListItemLink href="https://github.com/booooza/swe2-uno">
          <ListItemIcon>
            <img src={uno} className={classes.projectAvatar} alt="UNO" />
          </ListItemIcon>
          <ListItemText primary="UNO" />
        </ListItemLink>
      </List>
    </div>
  );
};
