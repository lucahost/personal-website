import React from 'react';
import './Projects.css'
import biergit from './../biergit.png';
import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ComputerIcon from '@material-ui/icons/Computer';
import RssFeedIcon from '@material-ui/icons/RssFeed';

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export const Projects: React.FC = () => {
  return (
    <div className="App-projects">
      <p>My Projects</p>

      <Card>
        <CardContent>
          <List component="nav">
            <ListItemLink href="/">
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary="Website" />
            </ListItemLink>
            <ListItemLink href="https://blog.lucahost.dev">
              <ListItemIcon>
                <RssFeedIcon />
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItemLink>
            <ListItemLink href="https://biergit.ch">
              <ListItemIcon>
                <img src={biergit} className="Projects-avatar" alt="biergit"/>
              </ListItemIcon>
              <ListItemText primary="biergit.ch" />
            </ListItemLink>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};