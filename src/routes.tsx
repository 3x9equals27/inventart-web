import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './routes.module.css'
import NavBar from './components/NavBar/NavBar';
import App from './views/app/App'
import Playground from './views/playground/Playground';
import ShowModel from './views/ShowModel/ShowModel';


export const Routes = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.content}>
      <Switch>
        <Route exact path="/Home" component={Playground} />
        <Route exact path="/Model" component={ShowModel} />
        <Route exact path="/About" component={App} />
        <Route exact path="/"><Redirect to="/Home" /></Route>
        <Route render={() => <Redirect to="/Home"/>}/>
      </Switch>
      </div>
    </div>
  );
};