import React from 'react';
import styles from './NoAccessPage.module.css';

export const NoAccessPage: React.FC = () => {
  return <div className={styles.centeredContent}>
  <div>You are logged in and your email is verified but it appears you don't have access rights</div>
  <div>Please wait for someone to grant you access or contact inventart.contact@gmail.com</div>
</div>;
};

export default NoAccessPage;
