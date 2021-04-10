import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes';
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from './config';

ReactDOM.render(
  <Auth0Provider
    domain={config.auth0_domain}
    clientId={config.auth0_clientId}
    audience={config.auth0_audience}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Router>
        <Routes />
      </Router>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
