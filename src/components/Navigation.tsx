import React from 'react';
import { Route } from 'react-router-dom'
import clsx from 'clsx';

import { Drawer } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Index } from './Index';
import { Projects } from './Projects';

import './Navigation.css';
import { ProjectsList } from './ProjectList';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      opacity: 0.7
    },
    menuButton: {
      color: "#e1f5fe"
    },
    hide: {
      opacity: 0
    }

  }),
);

export default function Navigation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  }


  return (
    <div className="Navigation">
      <Drawer open={open} onClose={toggleDrawer(false)}
        className={classes.drawer} classes={{
          paper: classes.drawerPaper,
        }}>
        <ProjectsList />
      </Drawer>
      <Grid item xs={12}>
        <IconButton
          aria-label="Open drawer"
          onClick={toggleDrawer(true)}
          className={clsx(classes.menuButton, open && classes.hide)}>
          <MenuIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Route path="/" exact component={Index} />
        <Route path="/projects" component={Projects} />
      </Grid>
    </div >
  );
}