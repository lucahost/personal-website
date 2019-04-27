import React from 'react';
import luca from './../luca.png';
import './Index.css';
import { Link } from 'react-router-dom'

export const Index: React.FC = () => {
  return (
    <div className="App-index">
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
          <Link
            className="App-link"
            to="/projects"
            target="_blank"
            rel="noopener noreferrer"
          >
            Projects
        </Link>
        </li>
      </ul>
    </div>
  );
};