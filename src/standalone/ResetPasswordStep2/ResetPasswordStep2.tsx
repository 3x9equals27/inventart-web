import { CircularProgress } from '@material-ui/core';
import React, { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiResponse } from '../../interfaces/api.interface';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './ResetPasswordStep2.module.css';

export const ResetPasswordStep2: React.FC<{
  guid: string
}> = ({
  guid
}) => {
    const { t } = useTranslation();
    const api = new InventartApi(t);
    const [state, setState] = useState<{ loading: boolean, linkExists: boolean, resetComplete: boolean, password: string, passwordRepeat: string, errorMessage?: string }>({
      loading: true,
      linkExists: false,
      resetComplete: false,
      password: '',
      passwordRepeat: '',
      errorMessage: undefined
    });

    useEffect(() => {
      (async () => {
        //
        var result: ApiResponse = await (new InventartApi(t)).authResetPasswordStep2a(guid);
        setState(x => { return { ...x, loading: false, linkExists: result.success } });
        //
      })();
    }, [guid]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const response = await api.authResetPasswordStep2b(guid, state.password, state.passwordRepeat);
      console.warn('ResetPasswordStep2:handleSubmit', response);

      if (response.success) {
        setState(x => { return { ...x, resetComplete: true } });
      } else {
        setState(x => { return { ...x, errorMessage: response.errorMessage } });
      }
    }

    if (state.loading) {
      return <div className={styles.centeredContent}>
        <CircularProgress />
      </div>;
    }
    if (state.resetComplete) {
      return <div className={styles.centeredContent}>
        password reset complete.
      </div>;
    }
    if (!state.linkExists) {
      return <div className={styles.centeredContent}>
        Invalid reset code.
      </div>;
    }

    return (
      <div className={styles.centeredContent}>
        <h2>Input new Password</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setState(x => { return { ...x, password: e.target.value } })} />
          </label>
          <label>
            <p>Repeat Password</p>
            <input type="password" onChange={e => setState(x => { return { ...x, passwordRepeat: e.target.value } })} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        {state.errorMessage && <div className={styles.errorDiv}>
          {state.errorMessage}
        </div>}
      </div>
    );
  };

export default ResetPasswordStep2;
