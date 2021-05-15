import styles from './UserSettings.module.css';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import _ from 'lodash';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';

const UserSettings = (inventartApi: InventartApi) => {

    console.warn('UserSettings', inventartApi);

    useEffect(() => {
      (async () => {
          var response = await inventartApi.authUserInfo();
          if(response.success){
            console.warn(response.payload);

            //var response2 = await inventartApi.userEditSelf('Heldero','deSousa','cenas','coisas');
          } else {
            //wip
          }

      })();
  }, [inventartApi]);
    
    return (
        <div className={styles.mainBody}>
        user settings
        </div>);
};

export default UserSettings;
