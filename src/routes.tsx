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
import { UserInterface } from './interfaces/user.interface';
const queryString = require('query-string');

export const Routes = () => {
  const history = useHistory();
  const { token, setToken, logout } = useToken();
  const [user, setUser] = useState<UserInterface>();

  //session => token, role, user(all from payload), tenant(code,short_name, long_name)

  console.warn('Routes.tsx tenant', user?.tenant);
  console.warn('Routes.tsx role', user?.role);
  console.warn('Routes.tsx userInfo', user?.info);
  //console.warn('Routes.tsx',);

  useEffect(() => {
    (async () => {
      //
      if (!token) return;
      if (user?.info) return;
      //
      var response = await (new InventartApi(token)).authUserInfo();
      if (response.success && response.payload) {
        const userInfo = response.payload;
        var userTenant = user?.tenant;
        var userRole = user?.role;
        if (!user?.tenant && (response.payload?.default_tenant?.length ?? 0) > 0) {
          userTenant = response.payload?.default_tenant;
          userRole = response.payload?.default_tenant_role;
        }
        setUser(x => { return { info: userInfo, tenant: userTenant, role: userRole } });
      } else {
        logout();
      }
      //
    })();
  }, [token, user, logout]);

  function setLoginToken(userToken: string): void {
    history.push('/');
    setToken(userToken);
    setUser(x => { return { info: undefined, tenant: undefined, role: undefined } });
  }
  function switchTenant(tenant: string, role: string): void {
    history.push('/');
    setUser(x => { return { info: x?.info, tenant: tenant, role: role } });
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

  if (!user?.info) {
    return <div className={styles.centeredContent}>
      <CircularProgress />
    </div>;
  }

  if (!user?.tenant || !user?.role) {
    let api = new InventartApi(token); 
    return <TenantSelection switchTenant={switchTenant} inventartApi={api} />
  }

  const inventartApi = new InventartApi(token, user?.tenant);
  const permissionManager = new PermissionManager(user?.role!);

  return (
    <div>
      <AppNavBar user={user} />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/Tenant" component={() => <TenantSelection switchTenant={switchTenant} inventartApi={inventartApi} />} />
          <Route exact path="/Home" component={() => Playground(inventartApi, permissionManager)} />
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

