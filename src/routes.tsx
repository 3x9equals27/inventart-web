import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './routes.module.css'
import NavBar from './components/NavBar/NavBar';
import App from './views/app/App'
import Playground from './views/playground/Playground';
import ShowModel from './views/ShowModel/ShowModel';
import Diagnostics from './views/Diagnostics/Diagnostics';
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from '@material-ui/core';

export const Routes = () => {
  const { isAuthenticated, isLoading, loginWithRedirect  } = useAuth0();

  if (isLoading === true) {
    return <div className={styles.circularProgress}>
    <CircularProgress/>
  </div>;
  }

  if (isAuthenticated === false) {
    loginWithRedirect();
  }

  if (isAuthenticated === true) {
    return (
      <div>
        <NavBar />
        <div className={styles.content}>
        <Switch>
          <Route exact path="/Home" component={Playground} />
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