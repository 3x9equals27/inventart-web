import React from 'react';
import styles from './NoAccessPage.module.css';

export const NoAccessPage: React.FC = () => {
  return <div className={styles.centeredContent}>
  <div>Please verify your email</div>
  <div>Check your inbox for the link to verify your account.</div>
</div>;
};

export default NoAccessPage;
