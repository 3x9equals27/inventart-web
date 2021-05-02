import { Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useToken from '../../hooks/useToken';
import { InventartApi } from '../../services/api/InventartApi';
import styles from './TenantSelection.module.css';

export interface TenantSelectionInterface {
  switchTenant: (tenant: string, role: string) => void,
  authToken: string
}

export const TenantSelection: React.FC<TenantSelectionInterface> = ({
  switchTenant,
  authToken
}) => {
  const { logout } = useToken();
  const [loading, setLoading] = useState<boolean>(true);
  const [tenantList, setTenantList] = useState<{ code: string, short_name: string, long_name: string, role: string }[]>();

  useEffect(() => {
    (async () => {
      //
      var response = await (new InventartApi(authToken)).authUserTenants();
      if (response.success) {
        console.warn('TenantSelection:useEffect', response.payload);
        setLoading(false);
        setTenantList(response.payload);
      } else {
        console.warn('TenantSelection:useEffect', 'error');
      }
      //
    })();
  }, [authToken]);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <CircularProgress />
      </div>
    )
  }

  function setTenant(tenant: string, role: string){
    switchTenant(tenant, role);
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
            <Button style={{width:'100%'}} variant='outlined' onClick={()=>{setTenant(tenant.code, tenant.role);}}>{tenant.long_name}</Button> 
          </div>
        </div>);
      })}
      </div>
    </div>
  )
}

export default TenantSelection;
