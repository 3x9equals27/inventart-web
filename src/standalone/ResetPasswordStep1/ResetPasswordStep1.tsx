import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './ResetPasswordStep1.module.css';

export const ResetPasswordStep1: React.FC<{
  email: string
}> = ({
  email
}) => {
    const [state, setState] = useState<{ loading: boolean, linkSent: boolean }>({
      loading: false,
      linkSent: false
    });

    useEffect(() => {
      (async () => {
        //
        var result: boolean = await (new InventartApi()).authResetPasswordStep1(email);
        setState(x => { return { loading: false, linkSent: result } });
        //
      })();
    }, [email]);

    if (state.loading) {
      return <div className={styles.centeredContent}>
        <CircularProgress />
      </div>;
    }

    if (state.linkSent) {
      return <div className={styles.centeredContent}>
        <div>Password reset link sent. Check your email.</div>
      </div>;
    }

    return <div className={styles.centeredContent}>
      <div>Password reset link sent. Check your email.</div>
    </div>;
  };

export default ResetPasswordStep1;
