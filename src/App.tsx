import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Index } from './components/Index';
import { Projects } from './components/Projects';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Index} />
        <Route path="/projects" component={Projects} />
        <footer className="App-footer">
          Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
        </footer>
      </div>
    </Router>
  );
}

export default App;
