import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { ProjectsList } from './ProjectList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    project: {
      backgroundColor: '#282c3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Courier New',
      color: 'white',
      fontSize: 'calc(10p + 2vmin)',
    },
  }),
);

export const Projects: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.project}>
      <p>My Projects</p>
      <Card>
        <CardContent>
          <ProjectsList />
        </CardContent>
      </Card>
    </div>
  );
};
