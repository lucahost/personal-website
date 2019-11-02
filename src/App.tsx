import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Navigation from './common/Navigation';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appContainer: {
      display: 'flex',
    },
    contentContainer: {
      minHeight: '90vh',
    },
    footer: {
      backgroundColor: '#282c34',
      fontFamily: 'Roboto',
      textAlign: 'center',
      verticalAlign: 'middle',
      color: 'white',
      minHeight: '10vh',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <Router>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.contentContainer}>
            <Navigation />
          </Grid>
          <Grid item xs={12}>
            <footer className={classes.footer}>
              <Typography>
                Made with{' '}
                <span role="img" aria-label="heart">
                  ❤️
              </span>{' '}
                in <b>Zurich</b>
              </Typography>
            </footer>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
};

export default App;
