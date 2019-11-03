import React from 'react';
import luca from './../../common/img/luca.png';
import './Index.css';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      height: '10vmin',
      pointerEvents: 'none',
    },
    homeContainer: {
      color: 'white',
      backgroundColor: '#282c34',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Courier New,Courier,monospace',
      fontSize: 'calc(10px + 2vmin)',
      p: {
        margin: '.3em',
      },
    },
    cmd: {
      animation: 'blink-animation 1s steps(2, start) infinite',
      '-webKitAnimation': 'blink-animation 1s steps(2, start) infinite',
    },
    noBull: {
      listStyleType: 'none',
    },
    link: {
      'color': '#61dafb'
    },
    courier: {
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      fontFamily: [
        'Courier New'
      ].join(','),
    }
  }),
);

export const Home: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.homeContainer}>
      <img src={luca} className={classes.logo} alt="logo" />
      <Typography className={classes.courier}>
        Hi{' '}
        <span role="img" aria-label="wave">
          👋
        </span>{' '}
        I&apos;m <b>Luca Hostettler</b>
<<<<<<< HEAD
      </Typography>
      <Typography className={classes.courier}>
=======
      </p>
      <p>
>>>>>>> 26e7e79b05a9baf28c46e20a56ee2e7139f9c373
        Coding is my passion{' '}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </Typography>
      <ul className="No-bull">
        <li>
          {'{'}0{'} '}
          <Link className={classes.link} to="/projects">
            Projects
          </Link>
        </li>
        <li>
          {'{'}1{'} '}
          <a
            className={classes.link}
            href="https://github.com/lucahost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
      <Typography className={classes.courier}>
        <span>fsociety~# </span>
        <span className={classes.cmd}>_</span>
      </Typography>
    </div>
  );
};
