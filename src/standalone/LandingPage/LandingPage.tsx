import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './LandingPage.module.css';

export interface LandingPageInterface {
  setToken: (token: string) => void
}

export const LandingPage: React.FC<LandingPageInterface> = ({
  setToken
}) => {
  const { t } = useTranslation();
  const api = new InventartApi(t);
  const [guestLoading, setGuestLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  async function loginAsGuest(){
    setGuestLoading(true);
    const result = await api.authLogin('guest@inventart','guest');
    console.warn('LandingPage:LoginAsGuest', result);
    if(result.success){
      setToken(result.payload);
    } else {
      setGuestLoading(false);
      setLoginError(result.errorMessage!);
    }
  }

  return (
    <div className={styles.pageWrapper}>
       <div className={styles.welcomeText}>
        <h1>Welcome to inventArt</h1>
       </div>
      <div className={styles.doors}>
        <div className={styles.door}>
          {/* <div className={styles.doorText}>option 1</div> */}
          <div className={styles.doorButton}>
            <Button variant='contained' color='primary' onClick={() => { window.location.href = '/login' }}>Login</Button>
          </div>
        </div>
        <div className={styles.door}>
          {/* <div className={styles.doorText}>option 2</div> */}
          <div className={styles.doorButton}><Button variant='outlined' color='secondary' onClick={() => { window.location.href = '/register' }}>Register</Button></div>
        </div>
        <div className={styles.door}>
          {/* <div className={styles.doorText}>Enter as guest</div> */}
          { !guestLoading && <div className={styles.doorButton}><Button variant='outlined' onClick={()=>loginAsGuest()}>Enter as guest</Button></div> }
          { guestLoading && <CircularProgress/> }
        </div>
      </div>
      <div className={styles.errorDiv}>{loginError}</div>
    </div>
  )
}

export default LandingPage;
