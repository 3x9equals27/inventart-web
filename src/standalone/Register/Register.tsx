import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './Register.module.css';

export const Register: React.FC = () => {
  const api = new InventartApi();
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [registrationError, setRegistrationError] = useState<string>('');
  const [registrationComplete, setRegistrationComplete] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(false);

  async function registerUser() {
    setRegistering(true);
    const response = await api.authRegister(username, password, passwordRepeat, firstName, lastName);
    console.warn('Register:handleSubmit', response);

    if (response.success) {
      setRegistrationComplete(true);
    } else {
      setRegistering(false);
      setRegistrationError(response.error!);
    }
  }

  if (registrationComplete) {
    return <div className={styles.registrationComplete}>
      <p>Registration complete</p>
      <p>Check your email for the verification link</p>
    </div>;
  }

  return (
    <div className={styles.registerWrapper}>
      <h1>Registration form</h1>

      <div className={styles.inputRow}>
        <div className={styles.inputDiv}>
          <TextField className={styles.inputField} required label="Email" variant="outlined" onChange={e => setUserName(e.target.value)} />
        </div>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputDiv}>
          <TextField className={styles.inputField} required label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={styles.inputDiv}><TextField className={styles.inputField} required label="Repeat Password" variant="outlined" onChange={e => setPasswordRepeat(e.target.value)} /></div>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.inputDiv}>
          <TextField className={styles.inputField} required label="First Name" variant="outlined" onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className={styles.inputDiv}>
          <TextField className={styles.inputField} required label="Last Name" variant="outlined" onChange={e => setLastName(e.target.value)} />
        </div>
      </div>
      { !registering && <Button variant='outlined' onClick={() => { registerUser(); }}>Register</Button> }
      { registering && <CircularProgress/> }
      <div className={styles.errorDiv}>{registrationError}</div>
    </div>
  )
}

export default Register;
