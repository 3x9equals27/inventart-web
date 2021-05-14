import { Button } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleMenu from '../../components/LanguageMenu/LanguageMenu';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './Login.module.css';

export interface LoginInterface {
  setToken: (token: string) => void
}

export const Login: React.FC<LoginInterface> = ({
  setToken
}) => {
  const api = new InventartApi();
  const { t } = useTranslation();
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await api.authLogin(username, password);
    console.warn('Login:handleSubmit', response);

    if (response.success) {
      setToken(response.token!);
    } else {
      setLoginError(response.error!);
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.languageMenu}>
        <LocaleMenu />
      </div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {loginError && <div className={styles.errorDiv}>
        {t(`login:${loginError}`)}
      </div>}
      {loginError === 'email.not.found' && <div className={styles.emailNotFound}>
        <Button variant='outlined' onClick={() => { window.location.href = '/register'; }}>{t(`login:go.to.registration`)}</Button>
      </div>}
      {loginError === 'wrong.password' && <div className={styles.wrongPassword}>
        <p>{t(`login:forgot.password`)}</p>
        <Button variant='outlined' onClick={() => { window.location.href = `/reset-password-step1?email=${username}`; }}>{t(`login:reset.password`)}</Button>
      </div>}
    </div>
  )
}

export default Login;
