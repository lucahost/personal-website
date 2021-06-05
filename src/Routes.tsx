import React, { Fragment } from "react";
import { Route } from "react-router";
import { Home } from "./components/home/Home";
import { Projects } from "./components/project/Projects";

const Routes: React.FC = () => {
  return (
    <Fragment>
      <Route path="/" exact component={Home} />
      <Route path="/projects" component={Projects} />
    </Fragment>
  );
};

export default Routes;
