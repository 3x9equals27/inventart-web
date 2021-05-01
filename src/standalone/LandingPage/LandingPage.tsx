import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { config } from '../../config';
import styles from './LandingPage.module.css';

export interface LandingPageInterface {
  setToken: (token: string) => void
}

export const LandingPage: React.FC<LandingPageInterface> = ({
  setToken
}) => {
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
          <div className={styles.doorButton}><Button variant='outlined' color='secondary'>Register</Button></div>
        </div>
        <div className={styles.door}>
          {/* <div className={styles.doorText}>Enter as guest</div> */}
          <div className={styles.doorButton}><Button variant='outlined'>Enter as guest</Button></div>
        </div>
      </div>
    </div>
  )
}



export default LandingPage;
