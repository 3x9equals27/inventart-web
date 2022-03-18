import styles from './PaintingList.module.css';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { PaintingDto } from '../../interfaces/paintingDto.interface';

const PaintingCreate = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [painting, setPainting] = useState<PaintingDto>({
    name: '',
    author: '',
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
    var response = await inventartApi.paintingCreate(painting);
    if (response.success) {
      uploadAttachment(response.payload.guid);
    } else {
      setAlertErrorMessage(response.errorMessage);
    }
  }

  async function uploadAttachment(guid: string) {
    if (guid && selectedFile) {
      var response = await inventartApi.paintingFileUpload(guid, selectedFile);
      if (response.success) {
        history.push('/PaintingList');
      } else {
        setAlertErrorMessage(response.errorMessage);
      }
    } else {
      history.push('/PaintingList');
    }
  }

  return (
    <div className={styles.mainBody}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} >
            <TextField fullWidth={true} id="outlined-basic" label={t('painting-create:name')} variant="outlined" value={painting.name} required onChange={(event) => { setPainting(x => { return { ...x, name: event.target.value } }); }} />
          </Grid>
          <Grid item xs={12} md={6} >
            <TextField fullWidth={true} id="outlined-basic" label={t('painting-create:author')} variant="outlined" value={painting.author} required onChange={(event) => { setPainting(x => { return { ...x, author: event.target.value } }); }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth={true} multiline={true} minRows={2} id="outlined-basic" label={t('painting-create:description')} variant="outlined" value={painting.description} required onChange={(event) => { setPainting(x => { return { ...x, description: event.target.value } }); }} />
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleFileSelect} />
          </Grid>
        </Grid>
      </Box>

      <Button variant='outlined' onClick={() => { createNewPainting(); }}>{t('painting-create:register')}</Button>

      <Snackbar open={!!alertErrorMessage} autoHideDuration={null} onClose={() => setAlertErrorMessage(undefined)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setAlertErrorMessage(undefined)} severity="error" >
          {alertErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PaintingCreate;
