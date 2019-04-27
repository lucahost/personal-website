import React from 'react';
import luca from './luca.png';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={luca} className="App-logo" alt="logo" />
        <p>
          Hi <span role="img" aria-label="wave">👋</span> I'm <b>Luca Hostettler</b> <span role="img" aria-label="rocket">🚀</span>
        </p>
        <p>
          Coding is my profession & hobby
        </p>
        <p>
          <span>></span>
          <span className="App-cmd">_</span>
        </p>
        <ul>
          <li>
            <a className="App-link"
              href="https://blog.lucahost.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
        </a>
          </li>
          <li>
            <a
              className="App-link"
              href="https://github.com/lucahost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
        </a>
          </li>
          <li>
            <a
              className="App-link"
              href="https://work.lucahost.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Projects
        </a>
          </li>
        </ul>
      </header>
      <footer className="App-footer">
        Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
      </footer>
    </div>
  );
}

export default App;
