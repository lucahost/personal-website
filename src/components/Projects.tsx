import React from 'react';
import './Projects.css'

import { Card, CardContent } from '@material-ui/core';
import { ProjectsList } from './ProjectList';

export const Projects: React.FC = () => {
  return (
    <div className="App-projects">
      <p>My Projects</p>
      <Card>
        <CardContent>
          <ProjectsList />
        </CardContent>
      </Card>
    </div>
  );
};