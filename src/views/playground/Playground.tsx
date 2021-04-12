import { Link, useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import logo from './play.png';
import { config } from '../../config';
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import { InventartApi } from "../../services/api/InventartApi";
import { PermissionManager } from "../../services/Authentication/PermissionManager";

//override typescript error messages on calls to window object
declare const window: any;

const Playground = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
  console.warn('Playground reading parameters InventartApi', inventartApi);
  console.warn('Playground reading parameters PermissionManager', permissionManager);
  const history = useHistory();
  const { user, logout, getAccessTokenSilently } = useAuth0();

  async function getAccessToken() {
    const accessToken = await getAccessTokenSilently();
    console.warn('getAccessToken', accessToken);
    const decoded: any = jwt_decode(accessToken);
    window.jwt = decoded;
    console.warn('window.jwt', window.jwt);
    if (decoded.permissions.includes('file:upload')) {
      console.warn("decoded.permissions.includes('file:upload') evaluated to true");
    }
  }

  return (
    <div style={{ minHeight: '500px', maxHeight: '600px', width: '100%' }}>
      try new stuff here<br />

      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button><br />
      <button onClick={() => console.warn(user)}>Auth 0 User</button><br />
      <button onClick={() => getAccessToken()}>get access token</button><br />
      {/* Open in same window SPA style */}
      <Button color="inherit" onClick={() => { history.push('/Model?model=0e1249c3-aa30-4477-855e-660200669047') }}>history.push('/Model?model=0e1249c3-aa30-4477-855e-660200669047')</Button><br />
      <Link to={"/Model?model=0e1249c3-aa30-4477-855e-660200669047"}>Link to="/Model?model=0e1249c3-aa30-4477-855e-660200669047"</Link><br />
      {/* Open in new window */}
      <Link to={"/Model?model=0e1249c3-aa30-4477-855e-660200669047"} target="_blank">Link to="/Model?model=0e1249c3-aa30-4477-855e-660200669047" target="_blank"</Link><br />
      <a
        className="App-link"
        href={newWindowLink("/Model", "?model=0e1249c3-aa30-4477-855e-660200669047")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={async (e) => { e.preventDefault(); await openInNewWindow("/Model", "?model=0e1249c3-aa30-4477-855e-660200669047") }}
      >
        open 0e1249c3-aa30-4477-855e-660200669047 in another window
        </a><br />

      <button onClick={async () => await openInNewWindow("/Model", "?model=0e1249c3-aa30-4477-855e-660200669047")}> open 0e1249c3-aa30-4477-855e-660200669047 in another window</button><br />
      <button onClick={async () => showVariables()}> show config</button><br />
      <img src={logo} alt={'build warnings made me do it'} /><br />


      {/* <iframe src={`${config.hopSource}/3DHOP_embedded.html?url=https://res.cloudinary.com/inventart/image/upload/v1617566316/3DHOP/laurana_sh9bnm.ply`} height='300px' width='100%' ></iframe>
            <iframe src={`${config.hopSource}/3DHOP_embedded.html?url=https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz`} height='300px' width='100%' ></iframe>
            <iframe src={`${config.hopSource}/3DHOP_embedded.html?url=https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz`} height='300px' width='100%' ></iframe> */}

      {/* <div style={{width:'100%', display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                <div style={{width:'300px' }}>
                    <ModelViewer idx={1} url={'https://res.cloudinary.com/inventart/image/upload/v1617566316/3DHOP/laurana_sh9bnm.ply'} showEmbeddedButtons={true} ></ModelViewer>
                </div>
                <div style={{width:'300px' }}>
                    <ModelViewer idx={2} url={'https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz'} showEmbeddedButtons={true} ></ModelViewer>
                </div>
                <div style={{width:'300px' }}>
                    <ModelViewer idx={3} url={'https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz'} showEmbeddedButtons={true} ></ModelViewer>
                </div>
            </div> */}

    </div>);
};

export default Playground;

async function openInNewWindow(pathname: string, search: string) {
  const link = newWindowLink(pathname, search);

  window.other = window.open(link);
}

function newWindowLink(pathname: string, search: string) {
  return `${config.webRoot}${pathname}${search}`;
}

function showVariables() {
  console.warn('config', config);
}
