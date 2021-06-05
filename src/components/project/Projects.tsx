import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Container } from "@material-ui/core";
import { ProjectsList } from "./ProjectList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectContainer: {
      marginTop: theme.spacing(20),
    },
    projectCard: {
      marginTop: theme.spacing(4),
    },
    courier: {
      fontFamily: ["Courier New"].join(","),
      textAlign: "center",
    },
  })
);

export const Projects: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.projectContainer}>
      <Typography className={classes.courier} variant="h4">
        My Projects
      </Typography>
      <Card className={classes.projectCard}>
        <CardContent>
          <ProjectsList />
        </CardContent>
      </Card>
    </Container>
  );
};
