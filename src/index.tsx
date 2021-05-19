import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import '@pwabuilder/pwainstall';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    <pwa-install>Download</pwa-install>
  </ThemeProvider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
