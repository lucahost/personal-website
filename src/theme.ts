import { grey, lightBlue, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'body': {
          // Improve touch targets on mobile
          '@media (hover: none)': {
            '& button, & [role="button"], & a': {
              minHeight: '44px',
              minWidth: '44px',
            },
          },
          // Prevent text selection on UI elements
          'userSelect': 'none',
          'WebkitUserSelect': 'none',
          // Enable smooth scrolling
          'scrollBehavior': 'smooth',
        },
        // Allow text selection in content areas
        'p, span, div[role="textbox"]': {
          userSelect: 'text',
          WebkitUserSelect: 'text',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.9rem',
        },
        secondary: {
          fontSize: '0.8rem',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          width: '25px',
          height: '25px',
        },
      },
    },
    // Optimize buttons for mobile
    MuiButton: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            minHeight: '44px',
          },
        },
      },
    },
    // Optimize icon buttons for mobile
    MuiIconButton: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            padding: '12px',
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: lightBlue[200],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#282c34',
      paper: '#1e1e1e',
    },
    text: {
      primary: grey[100],
      secondary: grey[300],
    },
  },
  spacing: 14,
})

export default theme
