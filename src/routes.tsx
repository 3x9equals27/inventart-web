import { Route, Routes, Navigate, useNavigate  } from 'react-router-dom';
import styles from './routes.module.css';
import { AppNavBar } from './components/NavBar/NavBar';
import App from './views/app/App';
import Playground from './views/playground/Playground';
import ShowModel from './views/ShowModel/ShowModel';
import { CircularProgress } from '@material-ui/core';
import { InventartApi } from './services/api/InventartApi';
import { PermissionManager } from './services/Authentication/PermissionManager';
import VerifyEmailPage from './standalone/VerifyEmailPage/VerifyEmailPage';
import React, { useEffect, useState } from 'react';
import Login from './standalone/Login/Login';
import useToken from './hooks/useToken';
import LandingPage from './standalone/LandingPage/LandingPage';
import Register from './standalone/Register/Register';
import TenantSelection from './standalone/TenantSelection/TenantSelection';
import { SessionInterface, UserInfoInterface, UserTenantInterface } from './interfaces/session.interface';
import ResetPasswordStep1 from './standalone/ResetPasswordStep1/ResetPasswordStep1';
import ResetPasswordStep2 from './standalone/ResetPasswordStep2/ResetPasswordStep2';
import UserSettings from './views/UserSettings/UserSettings';
import UserPermissions from './views/UserPermissions/UserPermissions';
import { useTranslation } from 'react-i18next';
import useSessionLanguage from './hooks/useSessionLanguage';
import useSessionTenant from './hooks/useSessionTenant';
import PaintingList from './views/Painting/PaintingList';
import PaintingCreate from './views/Painting/PaintingCreate';
import PaintingUpdate from './views/Painting/PaintingUpdate';
const queryString = require('query-string');

export const MyRouter = () => {
  const { t, i18n } = useTranslation();
  const { getSessionLanguage, unsetSessionLanguage } = useSessionLanguage();
  const { getSessionTenant, unsetSessionTenant, setSessionTenant } = useSessionTenant();
  const navigate = useNavigate();
  const { token, setToken, logout } = useToken();
  const [session, setSession] = useState<SessionInterface>();
  const [languageChanged, setLanguageChanged] = useState<boolean>(false);

  //console.warn('Routes.tsx: ', 'start');

  //clear session on logout
  if (!token && session) 
  {
    console.warn('Routes.tsx: ', 'logout detected, clearing session');
    setSession(undefined);
  }
  
  useEffect(() => {
    (async () => {
      //
      if (!token || session) return;
      console.warn('Routes.tsx: useEffect');
      //
      var api = new InventartApi(t, token);
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
      let session_tenant = getSessionTenant(tmp_user?.default_tenant);
      if (session_tenant) {
        var response_tenant = await api.authUserTenant(session_tenant);
        if (response_tenant.success && response_tenant.payload) {
          tmp_tenant = response_tenant.payload;
        }
      }
      //
      setSession(x => { return { user: tmp_user, tenant: tmp_tenant } });
      i18n.changeLanguage(getSessionLanguage(tmp_user?.default_language??i18n.language));
      setLanguageChanged(true);
      //
    })();
  }, [token, session, logout, getSessionTenant, i18n, getSessionLanguage]);

  function setLoginToken(userToken: string): void {
    navigate('/');
    setToken(userToken);
  }
  function switchTenant(tenant: UserTenantInterface): void {
    setSessionTenant(tenant.code);
    navigate('/');
    setSession(x => { return { user: x?.user, tenant: tenant } });
  }
  function userLogout(): void {
    navigate('/');
    logout();
    unsetSessionLanguage();
    unsetSessionTenant();
  }

  if (window.location.pathname === '/verify-email') {
    const qs = queryString.parse(window.location.search);
    return <VerifyEmailPage verificationCode={qs.guid} />
  }
  if (window.location.pathname === '/reset-password-step1') {
    const qs = queryString.parse(window.location.search);
    return <ResetPasswordStep1 email={qs.email} />
  }
  if (window.location.pathname === '/reset-password-step2') {
    const qs = queryString.parse(window.location.search);
    return <ResetPasswordStep2 guid={qs.guid} />
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

  if (!session?.user || !languageChanged) {
    return <div className={styles.centeredContent}>
      <CircularProgress />
    </div>;
  }

  if (!session?.tenant || !session?.tenant.role) {
    let api = new InventartApi(t, token);
    return <TenantSelection setTenantCallback={switchTenant} inventartApi={api} />
  }

  //console.warn('session', session);

  const inventartApi = new InventartApi(t, token, session?.tenant.code);
  const permissionManager = new PermissionManager(session.tenant?.role!);

  return (
    <div>
      <AppNavBar session={session} logout={userLogout} permissionManager={permissionManager}/>
      <div className={styles.content}>
        <Routes>
          <Route path="/Tenant" element={<TenantSelection setTenantCallback={switchTenant} inventartApi={inventartApi} />} />
          <Route path="/Playground" element={<Playground logout={userLogout} session={session} inventartApi={inventartApi} permissionManager={permissionManager} />} />
          <Route path="/Model" element={<ShowModel inventartApi={inventartApi} permissionManager={permissionManager} />} />
          <Route path="/About" element={<App/>} />
          <Route path="/PaintingList" element={<PaintingList inventartApi={inventartApi} permissionManager={permissionManager} />} />
          <Route path="/PaintingCreate" element={<PaintingCreate inventartApi={inventartApi} permissionManager={permissionManager} />} />
          <Route path="/PaintingUpdate" element={<PaintingUpdate inventartApi={inventartApi} permissionManager={permissionManager} />} />
          <Route path="/UserSettings" element={<UserSettings inventartApi={inventartApi} permissionManager={permissionManager} />} />
          <Route path="/UserPermissions" element={<UserPermissions inventartApi={inventartApi} permissionManager={permissionManager} />} />
          <Route path="/Home" element={<Navigate to="/PaintingList" />} />
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </div>
    </div>
  );
};
