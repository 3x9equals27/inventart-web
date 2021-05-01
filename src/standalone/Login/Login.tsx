import axios from 'axios';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { config } from '../../config';
import styles from './Login.module.css';

export interface LoginInterface {
  setToken: (token:string) => void
}

export const Login: React.FC<LoginInterface> = ({
  setToken
}) => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const token = await loginUser(username,password);
    console.warn('Login:handleSubmit', token);
    setToken(token);
  }

  async function loginUser(username:string, password:string) {
    return axios.post(`${config.apiRoot}/auth/login`, {
      email: username,
      password: password
    },{
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        console.warn('Login:loginUser:then', res.data);
        return res.data;
      })
      .catch(err => {
        setLoginError(err.response.data);
        console.warn('catch', err.response);
      });
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
      <div>{loginError}</div>
    </div>
  )
}

export default Login;
