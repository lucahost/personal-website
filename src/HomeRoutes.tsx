import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./components/home/Home";
import { Projects } from "./components/project/Projects";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
};

export default HomeRoutes;
