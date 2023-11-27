import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.9rem",
        },
        secondary: {
          fontSize: "0.8rem",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          width: "25px",
          height: "25px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#0288d1",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#282c34",
    },
    text: {
      primary: "white",
    },
  },
  spacing: 14,
});

export default theme;
