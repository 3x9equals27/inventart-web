import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './routes.module.css'
import NavBar from './components/NavBar/NavBar';
import App from './views/app/App'
import Playground from './views/playground/Playground';
import ShowModel from './views/ShowModel/ShowModel';
import Diagnostics from './views/Diagnostics/Diagnostics';
import { CircularProgress } from '@material-ui/core';
import { useAuthentication } from './hooks/useAuthentication';
import { AuthInfo } from './interfaces/AuthInfo.interface';

export const Routes = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, user, token, roles } = useAuthentication();

  if (isLoading === true) {
    return <div className={styles.circularProgress}>
    <CircularProgress/>
  </div>;
  }

  if (isAuthenticated === false) {
    loginWithRedirect();
  }

  if (isAuthenticated === true && user.email_verified === false) {
    return <div className={styles.verifyEmail}>
    <div>Please verify your email {user.email}</div>
    <div>Check your inbox for the link to verify your account.</div>
  </div>;
  }

  if(roles.visitor === false){
    //WIP
    //does not have even the lowest access
    //redirect to a screen where the user is informed he must wait for approval or contact X
  }

  if (isAuthenticated === true) {

    const authInfo:AuthInfo = {token: token, roles: roles};

    return (
      <div>
        <NavBar />
        <div className={styles.content}>
        <Switch>
          <Route exact path="/Home" component={()=>Playground(authInfo)} />
          <Route exact path="/Model" component={ShowModel} />
          <Route exact path="/About" component={App} />
          <Route exact path="/Diagnostics" component={Diagnostics} />
          <Route exact path="/"><Redirect to="/Home" /></Route>
          <Route render={() => <Redirect to="/Home"/>}/>
        </Switch>
        </div>
      </div>
    );
  }
  
  return <></>;
};