import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

export function useAuthentication() {
  const { isLoading, error, isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [authParams, setAuthParams] = useState<{ accessToken: string, isLoading: boolean, role: string }>({
    accessToken: '',
    isLoading: true,
    role: ''
  });

  useEffect(() => {
    (async () => {
      if (isLoading) return;
      if (authParams.isLoading === false) return;
      if (!isAuthenticated) {
        setAuthParams(a => { return { isLoading: false, role: a.role, accessToken: a.accessToken } });
        return;
      }

      const accessToken = await getAccessTokenSilently();
      const role = getRole(accessToken);

      setAuthParams({
        accessToken: accessToken,
        isLoading: false,
        role: role
      });
    })();
  }, [getAccessTokenSilently, isLoading, isAuthenticated, authParams.isLoading]);

  return {
    isLoading: isLoading || authParams.isLoading,
    error, 
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    token: authParams.accessToken,
    role: authParams.role
  };
}

function getRole(token: string): string {
  const decoded: any = jwt_decode(token);
  if (decoded.permissions.length === 1)
    return decoded.permissions[0];
  return 'not:valid';
}
