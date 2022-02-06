import styles from './DiagnosticList.module.css';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const DiagnosticCreate = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [diagnostic, setDiagnostic] = useState<{ description: string }>({
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | undefined>();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  }

  async function createNewDiagnostic() {
    var response = await inventartApi.diagnosticCreate(diagnostic.description);
    if (response.success) {
      uploadAttachment(response.payload.guid);
    } else {
      setAlertErrorMessage(response.error);
    }
  }

  async function uploadAttachment(guid: string) {
    if (guid && selectedFile) {
      var response = await inventartApi.diagnosticFileUpload(guid, selectedFile);
      if (response.success) {
        history.push('/DiagnosticList')
      } else {
        setAlertErrorMessage(response.error);
      }
    }
  }

  return (
    <div className={styles.mainBody}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Description" variant="outlined" value={diagnostic.description} required onChange={(event) => { setDiagnostic(x => { return { ...x, description: event.target.value } }); }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            2
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="file" onChange={handleFileSelect} />
          </Grid>
          <Grid item xs={12} sm={6}>
            4
          </Grid>
        </Grid>
      </Box>

      <Button variant='outlined' onClick={() => { createNewDiagnostic(); }}>Register</Button>

      <Snackbar open={!!alertErrorMessage} autoHideDuration={null} onClose={() => setAlertErrorMessage(undefined)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setAlertErrorMessage(undefined)} severity="error" >
          {alertErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DiagnosticCreate;
