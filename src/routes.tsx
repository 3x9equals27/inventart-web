import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './routes.module.css'
import NavBar from './components/NavBar/NavBar';
import App from './views/app/App'
import Playground from './views/playground/Playground';
import ShowModel from './views/ShowModel/ShowModel';
import Diagnostics from './views/Diagnostics/Diagnostics';
import { CircularProgress } from '@material-ui/core';
import { useAuthentication } from './hooks/useAuthentication';
import { InventartApi } from './services/api/InventartApi';
import { PermissionManager } from './services/Authentication/PermissionManager';
import { Permission } from './services/Authentication/Permission';
import VerifyEmailPage from './standalone/VerifyEmailPage/VerifyEmailPage';
import NoAccessPage from './standalone/NoAccessPage/NoAccessPage';
const queryString = require('query-string');

export const Routes = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, user, token, role } = useAuthentication();

  const qs = queryString.parse(window.location.search);
  if (qs.error) {
    if (qs.error_description === 'email_not_verified')
      return <VerifyEmailPage />;
    return <div className={styles.centeredContent}><div>{qs.error}</div></div>;
  }

  if (isLoading === true) {
    return <div className={styles.centeredContent}>
      <CircularProgress />
    </div>;
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
    return <NoAccessPage/>;
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
};
