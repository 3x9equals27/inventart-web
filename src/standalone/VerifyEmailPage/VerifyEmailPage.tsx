import React from 'react';
import styles from './VerifyEmailPage.module.css';

export const VerifyEmailPage: React.FC = () => {
  return <div className={styles.centeredContent}>
  <div>Please verify your email</div>
  <div>Check your inbox for the link to verify your account.</div>
</div>;
};

export default VerifyEmailPage;
