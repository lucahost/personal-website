import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Grid from '@material-ui/core/Grid';
import Navigation from './components/Navigation';


const App: React.FC = () => {
  return (
    <div className=".App">
      <Router>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Navigation />
          </Grid>
          <Grid item xs={12}>
            <footer className="App-footer">
              Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
            </footer>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
