import React, { Fragment } from "react";

import { Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { ProjectsList } from "../components/project/ProjectList";

const NavigationDrawer: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [open, setOpen] = React.useState(false);

  const drawerStyle = {
    flexShrink: 0,
    color: "black",
    width: "240px",
    opacity: 0.8,
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  return (
    <Fragment>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={drawerStyle}
        PaperProps={{ style: drawerStyle }}
      >
        <ProjectsList />
      </Drawer>
      <IconButton
        aria-label="Open drawer"
        onClick={toggleDrawer(true)}
        sx={{
          opacity: open ? 0 : 1,
          color: "#e1f5fe",
        }}
      >
        <MenuIcon />
      </IconButton>
    </Fragment>
  );
};

export default NavigationDrawer;
