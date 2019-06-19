import React from 'react';
import luca from './../img/luca.png';
import './Index.css';
import { Link } from 'react-router-dom'

export const Index: React.FC = () => {
  return (
    <div className="App-index">
      <img src={luca} className="App-logo" alt="logo" />
      <p>
        Hi <span role="img" aria-label="wave">👋</span> I'm <b>Luca Hostettler</b>
      </p>
      <p>
        Coding is my passion  <span role="img" aria-label="rocket">🚀</span>
      </p>
      <ul className="No-bull">
        <li>
          {'{'}0{'} '}
          <Link
            className="App-link"
            to="/projects"
          >
            Projects
        </Link>
        </li>
        <li>
          {'{'}1{'} '}
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
          {'{'}2{'} '}
          <a className="App-link"
            href="https://blog.lucahost.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
        </a>
        </li>
      </ul>
      <p>
        <span>fsociety~# </span>
        <span className="App-cmd">_</span>
      </p>
    </div>
  );
};