import React, { Fragment } from 'react';
import clsx from 'clsx';

import { Drawer } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { ProjectsList } from '../components/project/ProjectList';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      color: 'black',
    },
    drawerPaper: {
      width: drawerWidth,
      opacity: 0.7,
    },
    menuButton: {
      color: '#e1f5fe',
    },
    hide: {
      opacity: 0,
    },
  }),
);

const NavigationDrawer: React.FC = () => {
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
  };

  return (
    <Fragment>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <ProjectsList />
      </Drawer>
      <IconButton
        aria-label="Open drawer"
        onClick={toggleDrawer(true)}
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
    </Fragment>
  );
};

export default NavigationDrawer;
