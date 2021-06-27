/* eslint-disabl */
import styles from './UserPermissions.module.scss';
import React, { useEffect, useState } from 'react';
import { InventartApi } from '../../services/api/InventartApi';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { Permission } from '../../services/Authentication/Permission';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { Column } from '@material-table/core';
import { GridCore } from '../../components/GridCore/GridCore';
import { Role } from '../../services/Authentication/Role';

const UserPermissions = (api: InventartApi, permissionManager: PermissionManager) => {
  const [state, setState] = useState<{ loading: boolean, gridData: Array<any> }>({
    loading: true,
    gridData: []
  });
  const [authorized] = useState<boolean>(permissionManager.Check(Permission.EDIT_PERMISSIONS));

  console.warn('UserPermissions');

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
      if (rowData.role === Role.CURATOR) {
        return 'Curator';
      }
      if (rowData.is_guest_user === true) {
        if (rowData.role === Role.GUEST) {
          return (<div>Guest Enabled</div>);
        }
        if (rowData.role === Role.DISABLED) {
          return (<div>Guest Disabled</div>);
        }
      }
      return (
        <div>{rowData.role}</div>
      );
    }
  },
  {
    title: 'Change',
    type: 'string',
    render: (rowData: any) => {
      console.warn(rowData);
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
        <div>{rowData.role}</div>
      );
    }
  }
];

/*
email: "guest@inventart"
first_name: "guestFN"
guid: "608e1358-5252-4433-ba7a-7dcefb6b4a54"
is_guest_user: true
last_name: "guestLN"
role: "role:guest"
*/
