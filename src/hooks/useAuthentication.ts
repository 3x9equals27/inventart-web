import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { AuthRoles } from '../interfaces/AuthRoles.interface';

export function useAuthentication() {
  const { isAuthenticated, isLoading, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
  const [authParams, setAuthParams] = useState<{accessToken:string,isLoading:boolean, roles:AuthRoles}>({
    accessToken:'',
    isLoading: true,
    roles: freshNewRoles
  });

  useEffect(() => {
    (async () => {
        if(isLoading) return;
        if(authParams.isLoading === false) return;
        if(!isAuthenticated) {
          setAuthParams(a => { return { isLoading:false, roles:a.roles, accessToken:a.accessToken }});
          return;
        }
        
        const accessToken = await getAccessTokenSilently();
        const roles = getRoles(accessToken);

        setAuthParams({
          accessToken:accessToken,
          isLoading: false,
          roles: roles
        });
    })();
}, [getAccessTokenSilently, isLoading, isAuthenticated, authParams.isLoading]);

  return { 
    isAuthenticated, 
    isLoading: isLoading || authParams.isLoading, 
    loginWithRedirect, 
    user, 
    token: authParams.accessToken,
    roles: authParams.roles
  };
}

function getRoles(token:string): AuthRoles {
  let roles: AuthRoles = freshNewRoles;
  const decoded:any = jwt_decode(token);
  //
  roles.curator = decoded.permissions.includes("role:curator");
  roles.contributor = decoded.permissions.includes("role:contributor") || roles.curator;
  roles.visitor = decoded.permissions.includes("role:visitor") || roles.contributor;
  //
  return roles;
}

const freshNewRoles: AuthRoles = {
  visitor:false, 
  contributor:false, 
  curator:false
};
