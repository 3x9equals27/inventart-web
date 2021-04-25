import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './routes.module.css'
import NavBar from './components/NavBar/NavBar';
import App from './views/app/App'
import Playground from './views/playground/Playground';
import ShowModel from './views/ShowModel/ShowModel';
import Diagnostics from './views/Diagnostics/Diagnostics';
import { CircularProgress } from '@material-ui/core';
import { InventartApi } from './services/api/InventartApi';
import { PermissionManager } from './services/Authentication/PermissionManager';
import { Permission } from './services/Authentication/Permission';
import VerifyEmailPage from './standalone/VerifyEmailPage/VerifyEmailPage';
import NoAccessPage from './standalone/NoAccessPage/NoAccessPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from './config';
import Login from './standalone/Login/Login';
import useToken from './hooks/useToken';
const queryString = require('query-string');

export const Routes = () => {
  const { token, setToken, logout } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  console.warn('after logout',token);

  return <div>YOU SHALL NOT PASS<button onClick={() => logout()}>Logout</button></div>;

  /*
  const { isAuthenticated, error, isLoading, loginWithRedirect, user, token: cenas, role } = useAuthentication();



  if (isLoading === true) {
    return <div className={styles.centeredContent}>
      <CircularProgress />
    </div>;
  }

  if (error) {
    if (error.message === 'email_not_verified')
      return <VerifyEmailPage />;
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated === false) {
    loginWithRedirect();
    return <></>;
  }

  if (isAuthenticated === true && user.email_verified === false) {
    return <VerifyEmailPage />;
  }

  const pm = new PermissionManager(role);

  if (!pm.Check(Permission.APP_ACCESS)) {
    return <NoAccessPage />;
  }

  if (isAuthenticated === true) {

    const inventartApi = new InventartApi(token);

    return (
      <div>
        <NavBar />
        <div className={styles.content}>
          <Switch>
            <Route exact path="/Home" component={() => Playground(inventartApi, pm)} />
            <Route exact path="/Model" component={ShowModel} />
            <Route exact path="/About" component={App} />
            <Route exact path="/Diagnostics" component={Diagnostics} />
            <Route exact path="/"><Redirect to="/Home" /></Route>
            <Route render={() => <Redirect to="/Home" />} />
          </Switch>
        </div>
      </div>
    );
  }

  return <></>;

  */
};
