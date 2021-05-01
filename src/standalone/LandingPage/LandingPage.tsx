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

  async function loginAsGuest(){
    const token = await loginUser('guest@inventart','guest');
    console.warn('LandingPage:LoginAsGuest', token);
    setToken(token);
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
          <div className={styles.doorButton}><Button variant='outlined' color='secondary'>Register</Button></div>
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
      console.warn('catch', err.response);
    });
 }