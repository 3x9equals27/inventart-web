import { Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useToken from '../../hooks/useToken';
import { UserTenantInterface } from '../../interfaces/session.interface';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './TenantSelection.module.css';

export interface TenantSelectionInterface {
  setTenantCallback: (tenant: UserTenantInterface) => void,
  inventartApi: InventartApi
}

export const TenantSelection: React.FC<TenantSelectionInterface> = ({
  setTenantCallback,
  inventartApi
}) => {
  const { logout } = useToken();
  const [loading, setLoading] = useState<boolean>(true);
  const [tenantList, setTenantList] = useState<UserTenantInterface[]>();

  useEffect(() => {
    (async () => {
      //
      var response = await inventartApi.authUserTenants();
      if (response.success) {
        console.warn('TenantSelection:useEffect', response.payload);
        setLoading(false);
        setTenantList(response.payload);
      } else {
        console.warn('TenantSelection:useEffect', 'error');
      }
      //
    })();
  }, [inventartApi]);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <CircularProgress />
      </div>
    )
  }

  function setTenant(tenant: UserTenantInterface){
    setTenantCallback(tenant);
  };

  return (
    <div className={styles.pageWrapper}>
      <Button onClick={() => { logout(); window.location.href = '/'; }}>Logout</Button>
       Tenant selection
      <div className={styles.listTable}>
      {tenantList?.map((tenant)=>{
        return (<div className={styles.listRow} key={tenant.code}>
          <div className={styles.listCell}>{tenant.short_name}</div>
          <div className={styles.listCell}>
            <Button style={{width:'100%'}} variant='outlined' onClick={()=>{setTenant(tenant);}}>{tenant.long_name}</Button> 
          </div>
        </div>);
      })}
      </div>
    </div>
  )
}

export default TenantSelection;
