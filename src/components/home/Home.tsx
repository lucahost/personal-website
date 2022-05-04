import React, { useState, useEffect } from "react";
import luca from "./../../common/img/luca.png";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Container, Fade } from "@material-ui/core";
import { Computer, GitHub, LinkedIn, Twitter } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeContainer: {
      marginTop: theme.spacing(20),
    },
    logo: {
      height: "10vmin",
      pointerEvents: "none",
    },
    textAlignLeft: {
      textAlign: "left",
    },
    noListStyle: {
      listStyleType: "none",
      marginLeft: theme.spacing(4),
    },
    link: {
      color: "#61dafb",
    },
    courier: {
      fontSize: "calc(10px + 2vmin)",
      color: "white",
      textAlign: "center",
      fontFamily: ["Courier New"].join(","),
    },
  })
);

export const Home: React.FC = () => {
  const classes = useStyles();
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBlink(!blink);
    }, 350);
  });

  return (
    <Grid
      container
      spacing={2}
      className={`${classes.courier} ${classes.homeContainer}`}
    >
      <Grid item xs={12}>
        <img src={luca} className={classes.logo} alt="logo" />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.courier}>
          Hi{" "}
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          I&apos;m <b>Luca Hostettler</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.courier}>
          Coding is my passion{" "}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.textAlignLeft}>
        <Container maxWidth="xs">
          <ul className={classes.noListStyle}>
            <li>
              {"{"}
              <Computer />
              {"} "}
              <Link className={classes.link} to="/projects">
                Projects
              </Link>
            </li>
            <li>
              {"{"}
              <GitHub />
              {"} "}
              <a
                className={classes.link}
                href="https://github.com/lucahost"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              {"{"}
              <LinkedIn />
              {"} "}
              <a
                className={classes.link}
                href="https://www.linkedin.com/in/lucahostettler/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              {"{"}
              <Twitter />
              {"} "}
              <a
                className={classes.link}
                href="https://twitter.com/luca_host"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.courier}>
          <span>fsociety~# </span>
          <Fade in={blink}>
            <span>_</span>
          </Fade>
        </Typography>
      </Grid>
    </Grid>
  );
};
