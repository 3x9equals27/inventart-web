import React, { FormEvent, useState } from 'react';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './Login.module.css';

export interface LoginInterface {
  setToken: (token:string) => void
}

export const Login: React.FC<LoginInterface> = ({
  setToken
}) => {
  const api = new InventartApi();
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const response = await api.authLogin(username,password);
    console.warn('Login:handleSubmit', response);

    if(response.success) {
      setToken(response.token!);
    } else {
      setLoginError(response.error!);
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className={styles.errorDiv}>{loginError}</div>
    </div>
  )
}

export default Login;
