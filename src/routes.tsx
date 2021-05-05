import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import styles from './routes.module.css'
import { AppNavBar } from './components/NavBar/NavBar';
import App from './views/app/App'
import Playground from './views/playground/Playground';
import ShowModel from './views/ShowModel/ShowModel';
import Diagnostics from './views/Diagnostics/Diagnostics';
import { CircularProgress } from '@material-ui/core';
import { InventartApi } from './services/api/InventartApi';
import { PermissionManager } from './services/Authentication/PermissionManager';
import VerifyEmailPage from './standalone/VerifyEmailPage/VerifyEmailPage';
import { useEffect, useState } from 'react';
import Login from './standalone/Login/Login';
import useToken from './hooks/useToken';
import LandingPage from './standalone/LandingPage/LandingPage';
import Register from './standalone/Register/Register';
import TenantSelection from './standalone/TenantSelection/TenantSelection';
import { SessionInterface, UserInfoInterface, UserTenantInterface } from './interfaces/session.interface';
const queryString = require('query-string');

export const Routes = () => {
  const history = useHistory();
  const { token, setToken, logout } = useToken();
  const [session, setSession] = useState<SessionInterface>();

  console.warn('Routes.tsx: ', '1');
  console.warn(token, session);
  //clear session on logout
  if (!token && session) 
  {
    console.warn('Routes.tsx: ', 'logout detected, clearing session');
    setSession(undefined);
  }
  console.warn('Routes.tsx: ', '2');
  
  useEffect(() => {
    (async () => {
      //
      if (!token || session) return;
      //
      var api = new InventartApi(token);
      var tmp_user: UserInfoInterface | undefined = undefined;
      var tmp_tenant: UserTenantInterface | undefined = undefined;
      //
      var response_user = await api.authUserInfo();
      if (!response_user.success || !response_user.payload) {
        console.warn('FAIL 1');
        logout();
      }
      //
      tmp_user = response_user.payload;
      if (tmp_user?.default_tenant) {
        var response_tenant = await api.authUserTenant(tmp_user.default_tenant);
        if (response_tenant.success && response_tenant.payload) {
          console.warn('response_tenant.payload', response_tenant.payload);
          tmp_tenant = response_tenant.payload;
        }
      }
      //
      setSession(x => { return { user: tmp_user, tenant: tmp_tenant } });
      //
    })();
  }, [token, session, logout]);

  function setLoginToken(userToken: string): void {
    history.push('/');
    setToken(userToken);
  }
  function switchTenant(tenant: UserTenantInterface): void {
    history.push('/');
    setSession(x => { return { user: x?.user, tenant: tenant } });
  }
  function userLogout(): void {
    history.push('/');
    logout();
  }

  if (window.location.pathname === '/verify-email') {
    const qs = queryString.parse(window.location.search);
    return <VerifyEmailPage verificationCode={qs.guid} />
  }
  if (!token && window.location.pathname === '/login') {
    return <Login setToken={setLoginToken} />
  }
  if (!token && window.location.pathname === '/register') {
    return <Register />
  }

  if (!token) {
    return <LandingPage setToken={setLoginToken} />
  }

  if (!session?.user) {
    return <div className={styles.centeredContent}>
      <CircularProgress />
    </div>;
  }

  if (!session?.tenant || !session?.tenant.role) {
    let api = new InventartApi(token);
    return <TenantSelection switchTenant={switchTenant} inventartApi={api} />
  }

  const inventartApi = new InventartApi(token, session?.tenant.code);
  const permissionManager = new PermissionManager(session.tenant?.role!);

  return (
    <div>
      <AppNavBar session={session} />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/Tenant" component={() => <TenantSelection switchTenant={switchTenant} inventartApi={inventartApi} />} />
          <Route exact path="/Home" component={() => Playground(userLogout, session, inventartApi, permissionManager)} />
          <Route exact path="/Model" component={() => ShowModel(inventartApi, permissionManager)} />
          <Route exact path="/About" component={App} />
          <Route exact path="/Diagnostics" component={() => Diagnostics(inventartApi, permissionManager)} />
          <Route exact path="/"><Redirect to="/Home" /></Route>
          <Route render={() => <Redirect to="/Home" />} />
        </Switch>
      </div>
    </div>
  );
};

