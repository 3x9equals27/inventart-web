import styles from './UserSettings.module.scss';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import _ from 'lodash';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { Button, CircularProgress, Container, Dialog, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, OutlinedInput, Paper, Snackbar, TextField } from '@material-ui/core';
import LocaleMenu from '../../components/LanguageMenu/LanguageMenu';
import { Alert } from '@material-ui/lab';
import TenantSelection from '../../standalone/TenantSelection/TenantSelection';
import { UserInfoInterface, UserTenantInterface } from '../../interfaces/session.interface';

const UserSettings = (api: InventartApi) => {
  const [state, setState] = useState<{ firstName: string, lastName: string, defaultTenant: string | null, defaultLanguage: string, defaultTenantName: string }>({
    firstName: '',
    lastName: '',
    defaultTenant: null,
    defaultLanguage: 'en-GB',
    defaultTenantName: 'No Selection'
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [savingError, setSavingError] = useState<string>('');
  const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);
  const [showTenantSelection, setShowTenantSelection] = React.useState(false);
  

  const closeAlertSuccess = (event?: React.SyntheticEvent, reason?: string) => {
    setOpenAlertSuccess(false);
  };

  console.warn('UserSettings');

  useEffect(() => {
    (async () => {
      console.warn('UserSettings:useEffect');
      
      var resp_user = await api.authUserInfo();
      if (resp_user.success) {
        let userInfo: UserInfoInterface = resp_user.payload!;
        console.warn(resp_user.payload);

        let defaultTenantName:string = state.defaultTenantName;
        if(userInfo.default_tenant){
          var resp_ten = await api.authUserTenant(userInfo.default_tenant);
          if (resp_ten.success) {
            defaultTenantName = resp_ten.payload?.short_name??state.defaultTenantName;
          }
        }

        setState(x => {
          return {
            ...x,
            firstName: userInfo.first_name ?? '',
            lastName: userInfo.last_name ?? '',
            defaultTenant: userInfo.default_tenant ?? null,
            defaultLanguage: userInfo.default_language ?? '',
            defaultTenantName: defaultTenantName
          }
        });
        //var response2 = await inventartApi.userEditSelf('Heldero', 'deSousa', 'FBAUL', 'coisas');
        //console.warn(response2);
      } else {
        //wip
      }

    })();
  }, [api]);

  async function saveUserSettings() {
    setSaving(true);
    const response = await api.userEditSelf(state.firstName, state.lastName, state.defaultTenant, state.defaultLanguage);
    console.warn('UserSettings:handleSubmit', response);

    setSaving(false);
    if (response.success) {
      setSavingError('');
      setOpenAlertSuccess(true);
    } else {
      setSavingError(response.error!);
    }

  }

  async function setDefaultLanguage(language: string) {
    setState(x => { return { ...x, defaultLanguage: language } });
  }
  async function openTenantSelector() {
    setShowTenantSelection(true);
  }
  async function closeTenantSelector() {
    setShowTenantSelection(false);
  }
  function setTenant(tenant: UserTenantInterface): void {
    console.log(tenant);
    closeTenantSelector();
    setState(x => { return { ...x, defaultTenant: tenant.code, defaultTenantName: tenant.short_name } });
  }

  return (
    <div className={styles.mainBody}>
      user settings
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid className={styles.gridItem} item xs={12} sm={6}>
            <TextField required label="First name" variant="outlined" value={state.firstName} onChange={e => { setState(x => { return { ...x, firstName: e.target.value } }); }} />
          </Grid>
          <Grid className={styles.gridItem} item xs={12} sm={6}>
            <TextField required label="Last name" variant="outlined" value={state.lastName} onChange={e => { setState(x => { return { ...x, lastName: e.target.value } }); }} />
          </Grid>
          <Grid className={styles.gridItem} item xs={12} sm={6}>
            <TextField className={styles.adornedTextfield} required label="Tenant" variant="outlined" InputProps={{
              startAdornment: <Button color='inherit' variant='text' onClick={() => { openTenantSelector(); }}>{state.defaultTenantName}</Button>
            }} />
          </Grid>
          <Grid className={styles.gridItem} item xs={12} sm={6}>
            <TextField className={styles.adornedTextfield} required label="Language" variant="outlined" InputProps={{
              startAdornment: <LocaleMenu showText={true} language={state.defaultLanguage} setLanguageOverride={setDefaultLanguage} />
            }} />
          </Grid>
          <Grid className={styles.gridItem} item xs={12}>
            {!saving && <Button variant='outlined' onClick={() => { saveUserSettings(); }}>Save</Button>}
            {saving && <CircularProgress />}
          </Grid>
          <Grid className={styles.gridItem} item xs={12}>
            <div className={styles.errorDiv}>{savingError}</div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={openAlertSuccess} autoHideDuration={2000} onClose={closeAlertSuccess}>
        <Alert onClose={closeAlertSuccess} severity="success">
          Preferences saved!
        </Alert>
      </Snackbar>

      <Dialog onClose={() => { closeTenantSelector();}} aria-labelledby="tenant-dialog-title" open={showTenantSelection}>
        <DialogTitle id="tenant-dialog-title">Select Tenant</DialogTitle>
        <TenantSelection setTenantCallback={setTenant} inventartApi={api} />
      </Dialog>

    </div>);
};

export default UserSettings;
