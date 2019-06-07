import React from 'react';
import './Projects.css'
import biergit from './../biergit.png';
import uno from './../uno.png';
import muuvy from './../muuvy.png';
import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';

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
                <Icon>computer</Icon>
              </ListItemIcon>
              <ListItemText primary="Website" />
            </ListItemLink>
            <ListItemLink href="https://blog.lucahost.dev">
              <ListItemIcon>
                <Icon>rss_feed</Icon>
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItemLink>
            <ListItemLink href="https://biergit.ch">
              <ListItemIcon>
                <img src={biergit} className="Projects-avatar" alt="biergit" />
              </ListItemIcon>
              <ListItemText primary="biergit" />
            </ListItemLink>
            <ListItemLink href="https://github.com/muuvy">
              <ListItemIcon>
                <img src={muuvy} className="Projects-avatar" alt="muuvy" />
              </ListItemIcon>
              <ListItemText primary="muuvy" />
            </ListItemLink>
            <ListItemLink href="https://github.com/boooza/swe2-uno">
              <ListItemIcon>
                <img src={uno} className="Projects-avatar" alt="UNO" />
              </ListItemIcon>
              <ListItemText primary="UNO" />
            </ListItemLink>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};