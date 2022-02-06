import styles from './PaintingList.module.css';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const PaintingCreate = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [painting, setPainting] = useState<{ description: string }>({
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | undefined>();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  }

  async function createNewPainting() {
    var response = await inventartApi.paintingCreate(painting.description);
    if (response.success) {
      uploadAttachment(response.payload.guid);
    } else {
      setAlertErrorMessage(response.error);
    }
  }

  async function uploadAttachment(guid: string) {
    if (guid && selectedFile) {
      var response = await inventartApi.paintingFileUpload(guid, selectedFile);
      if (response.success) {
        history.push('/PaintingList')
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
            <TextField id="outlined-basic" label="Description" variant="outlined" value={painting.description} required onChange={(event) => { setPainting(x => { return { ...x, description: event.target.value } }); }} />
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

      <Button variant='outlined' onClick={() => { createNewPainting(); }}>Register</Button>

      <Snackbar open={!!alertErrorMessage} autoHideDuration={null} onClose={() => setAlertErrorMessage(undefined)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setAlertErrorMessage(undefined)} severity="error" >
          {alertErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PaintingCreate;
