import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config } from '../../config';
import styles from './VerifyEmailPage.module.css';

export const VerifyEmailPage: React.FC<{ 
  verificationCode: string 
}> = ({ 
  verificationCode 
}) => {
  const [verification, setVerification] = useState<{ loading: boolean, verified: boolean }>({
    loading: false,
    verified: false
  });

  useEffect(() => {
    (async () => {
      //
      var verificationResult: boolean = await axios.post(`${config.apiRoot}/auth/verify?verificationGuid=${verificationCode}`, {
        headers: {
        }
      })
        .then(res => {
          return true;
        }).catch(err => {
          return false;
        });
      setVerification(x => { return { loading: false, verified: verificationResult } });
      //
    })();
  }, []);

  if (verification.loading) {
    return <div className={styles.centeredContent}>
      <CircularProgress />
    </div>;
  }

  if (verification.verified) {
    return <div className={styles.centeredContent}>
      <div>Email verified</div>
      <div>
        <Button variant='outlined' color='primary' onClick={() => { window.location.href = '/login' }}>Procede to Login</Button>
      </div>
    </div>;
  }

  return <div className={styles.centeredContent}>
    <div>Verification failed</div>
  </div>;
};

export default VerifyEmailPage;
