import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#ff4081',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#282c34',
    },
  },
});

export default theme;
