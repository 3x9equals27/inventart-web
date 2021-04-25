import { useState } from 'react';

export default function useToken() {
  const getToken = ():string | undefined => {
    const userToken = localStorage.getItem('token');
    return userToken??undefined;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken:string) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(undefined);
  };

  return {
    setToken: saveToken,
    logout: logout,
    token
  }
}