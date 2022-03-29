import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiResponse } from '../../interfaces/api.interface';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './ResetPasswordStep1.module.css';

export const ResetPasswordStep1: React.FC<{
  email: string
}> = ({
  email
}) => {
    const { t } = useTranslation();
    const [state, setState] = useState<{ loading: boolean, linkSent: boolean }>({
      loading: false,
      linkSent: false
    });

    useEffect(() => {
      (async () => {
        //
        var result: ApiResponse = await (new InventartApi(t)).authResetPasswordStep1(email);
        setState(x => { return { loading: false, linkSent: result.success } });
        //
      })();
    }, [email, t]);

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
