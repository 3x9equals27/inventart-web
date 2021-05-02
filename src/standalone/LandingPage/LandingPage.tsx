import { Button } from '@material-ui/core';
import React from 'react';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './LandingPage.module.css';

export interface LandingPageInterface {
  setToken: (token: string) => void
}

export const LandingPage: React.FC<LandingPageInterface> = ({
  setToken
}) => {
  const api = new InventartApi();

  async function loginAsGuest(){
    const result = await api.authLogin('guest@inventart','guest');
    console.warn('LandingPage:LoginAsGuest', result);
    if(result.success){
      setToken(result.token!);
    } else {
      //WIP set error display to result.error
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
          <div className={styles.doorButton}><Button variant='outlined' onClick={()=>loginAsGuest()}>Enter as guest</Button></div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
