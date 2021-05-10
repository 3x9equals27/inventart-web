import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes';
import './i18n';

ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes />
      </Router>
    </React.StrictMode>,
  document.getElementById('root')
);
