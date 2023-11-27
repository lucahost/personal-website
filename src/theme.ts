import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme { }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#0288d1",
    },
    secondary: {
      main: "#ff4081",
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
  spacing: 8,
});

export default theme;
