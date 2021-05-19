import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

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

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
