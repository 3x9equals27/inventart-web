import { Link, useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import logo from './play.png';
import { config } from '../../config';

//override typescript error messages on calls to window object
declare const window: any;

const Playground = () => {
    const history = useHistory();
    
    return (
    <div style={{minHeight:'500px', maxHeight:'600px', width:'100%'}}>
        try new stuff here<br/>

        {/* Open in same window SPA style */}
        <Button color="inherit" onClick={()=>{history.push('/Model?model=gargo.nxz')}}>history.push('/Model?model=gargo.nxz')</Button><br/>
        <Link to={"/Model?model=gargo.nxz"}>Link to="/Model?model=gargo.nxz"</Link><br/>
        {/* Open in new window */}
        <Link to={"/Model?model=gargo.nxz"} target="_blank">Link to="/Model?model=gargo.nxz" target="_blank"</Link><br/>
        <a
          className="App-link"
          href={newWindowLink("/Model","?model=gargo.nxz")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => { e.preventDefault(); await openInNewWindow("/Model","?model=gargo.nxz")}}
        >
          open gargo.nxz in another window
        </a><br/>

        <button onClick={async () => await openInNewWindow("/Model","?model=gargo.nxz")}> open gargo.nxz in another window</button><br/>
        <button onClick={async () => showVariables()}> show variables</button><br/>
        <img src={logo} alt={'build warnings made me do it'} /><br/>
    </div>);
};

export default Playground;

async function openInNewWindow(pathname: string, search: string) {
    const link = newWindowLink(pathname, search);
    
    window.other = window.open(link);
}

function newWindowLink(pathname: string, search: string){
    return `${config.webRoot}${pathname}${search}`;
}

function showVariables(){
    console.warn('PUBLIC_URL', config.webRoot);
    console.warn('REACT_APP_3DHOP_SOURCE', config.hopSource);
    console.warn('REACT_APP_3DHOP_MODELS', config.hopModels);
}
