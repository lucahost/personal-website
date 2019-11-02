import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Navigation from './common/Navigation';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      textAlign: 'center',
      display: 'flex',
    },
    footer: {
      backgroundColor: '#282c34',
      textAlign: 'center',
      verticalAlign: 'middle',
      color: 'white',
      minHeight: '5vh',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Router>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Navigation />
          </Grid>
          <Grid item xs={12}>
            <footer className={classes.footer}>
              Made with{' '}
              <span role="img" aria-label="heart">
                ❤️
              </span>{' '}
              in <b>Zurich</b>
            </footer>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
};

export default App;
