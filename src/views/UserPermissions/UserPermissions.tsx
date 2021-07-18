/* eslint-disabl */
import styles from './UserPermissions.module.scss';
import React, { ReactNode, useEffect, useState } from 'react';
import { InventartApi } from '../../services/api/InventartApi';
import { Button, CircularProgress, MenuItem, Select, Typography } from '@material-ui/core';
import { Permission } from '../../services/Authentication/Permission';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { Column } from '@material-table/core';
import { GridCore } from '../../components/GridCore/GridCore';
import { Role } from '../../services/Authentication/Role';
import { useTranslation } from 'react-i18next';
import { couldStartTrivia } from 'typescript';
import { values } from 'lodash';

const UserPermissions = (api: InventartApi, permissionManager: PermissionManager) => {
  const { t } = useTranslation();
  const [state, setState] = useState<{ loading: boolean, gridData: Array<any> }>({
    loading: true,
    gridData: []
  });
  const [authorized] = useState<boolean>(permissionManager.Check(Permission.EDIT_PERMISSIONS));

  useEffect(() => {
    (async () => {
      if (!authorized || !state.loading) return;
      console.warn('UserPermissions:useEffect');
      var response = await api.userRolesList();
      if (response.success) {
        console.warn(response.payload);
        setState(x => {
          return {
            ...x,
            loading: false,
            gridData: response.payload
          }
        });
      } else {
        //wip
      }

    })();
  }, [api, state.loading, authorized]);

  const gridColumns: Array<Column<any>> = [
    {
      field: 'email',
      title: 'E-mail',
      type: 'string',
    },
    {
      field: 'first_name',
      title: 'First Name',
      type: 'string',
    },
    {
      field: 'last_name',
      title: 'Last Name',
      type: 'string',
    },
    {
      field: 'role',
      title: 'Role',
      type: 'string',
      render: (rowData: any) => {
        if (rowData.is_guest_user === true) {
          if (rowData.role === Role.GUEST) {
            return (<div>Guest Enabled</div>);
          }
          if (rowData.role === Role.DISABLED) {
            return (<div>Guest Disabled</div>);
          }
        }
        return (
          <div>{t(rowData.role)}</div>
        );
      }
    },
    {
      title: 'Change',
      type: 'string',
      render: (rowData: any) => {
        if (rowData.role === Role.CURATOR) {
          return '';
        }
        if (rowData.is_guest_user === true) {
          if (rowData.role === Role.GUEST) {
            return (<Button variant={'contained'} color={'secondary'}>Disable</Button>);
          }
          if (rowData.role === Role.DISABLED) {
            return (<Button variant={'contained'} color={'primary'}>Enable</Button>);
          }
        }
        return (
          <div>{roleSelector(rowData.guid, rowData.role)}</div>
        );
      }
    }
  ];

  function roleSelector(guid: string, role: string): ReactNode {
    return (
      <Select value={role} onChange={(event: any) => onChangeRoleSelector(guid,event.target.value)}>
        <MenuItem value={Role.DISABLED}>{t(Role.DISABLED)}</MenuItem>
        <MenuItem value={Role.VISITOR}>{t(Role.VISITOR)}</MenuItem>
        <MenuItem value={Role.CONTRIBUTOR}>{t(Role.CONTRIBUTOR)}</MenuItem>
      </Select>);
  }

  function onChangeRoleSelector(userGuid: string, role: string): void {
    console.warn(userGuid, role);
    //WIP: call user rle change here
    // curl -X POST "https://localhost:5001/user/FBAUL/roleChange/51654768-0967-48d3-b27a-ee4e0c2fcef3/role%3Adisabled"
  }

  if (!authorized) {
    return <div className={styles.mainBody} >Access Denied</div>;
  }

  if (state.loading) {
    return <div className={styles.loadingWrapper} ><CircularProgress /></div>;
  }

  console.warn('Grid about to be drawn');
  return (
    <div className={styles.mainBody}>
      <Typography className={styles.title} variant={'h5'}> user permissions</Typography>
      <GridCore data={state.gridData} columns={gridColumns}></GridCore>
    </div>);
};

export default UserPermissions;



/*
email: "guest@inventart"
first_name: "guestFN"
guid: "608e1358-5252-4433-ba7a-7dcefb6b4a54"
is_guest_user: true
last_name: "guestLN"
role: "role:guest"
*/
