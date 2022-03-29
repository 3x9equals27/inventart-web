import styles from './PaintingUpdate.module.css';
import _ from 'lodash';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { PaintingDto } from '../../interfaces/paintingDto.interface';

export interface PaintingUpdateInterface {
  inventartApi: InventartApi,
  permissionManager: PermissionManager
}

const PaintingUpdate = (props: PaintingUpdateInterface) => {
  let api = props.inventartApi;
  let permissionManager = props.permissionManager;

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [painting, setPainting] = useState<PaintingDto>({
    name: '',
    author: '',
    description: ''
  });
  const [currentData, setCurrentData] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const paintingGuid: string = searchParams.get('guid') ?? '';

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  }

  useEffect(() => {
    (async () => {
      //
      if (currentData) {
        setPainting({
          name: currentData.name ?? '',
          author: currentData.author ?? '',
          description: currentData.description ?? ''
        });
        setLoading(false);
      }
      //
    })();
  }, [currentData]);

  useEffect(() => {
    (async () => {
      //
      var response = await api.paintingSelect(paintingGuid);
      if (response.success) {
        setCurrentData(response.payload);
      } else {
        console.warn('PaintingUpdate:useEffect', 'error');
      }
      //
    })();
  }, [api, paintingGuid]);

  async function updatePainting() {
    var response = await api.paintingUpdate(paintingGuid, painting);
    if (response.success) {
      uploadAttachment(paintingGuid);
    } else {
      setAlertErrorMessage(response.errorMessage);
    }
  }
  async function deletePainting() {
    var response = await api.paintingDelete(paintingGuid);
    if (response.success) {
      navigate('/PaintingList');
    } else {
      setAlertErrorMessage(response.errorMessage);
    }
  }

  async function uploadAttachment(guid: string) {
    if (guid && selectedFile) {
      var response = await api.paintingFileUpload(guid, selectedFile);
      if (response.success) {
        navigate('/PaintingList');
      } else {
        setAlertErrorMessage(response.errorMessage);
      }
    } else {
      navigate('/PaintingList');
    }
  }

  function showModelLink() {
    return !currentData?.file_guid ? null :
      <Link target={'update-model'} to={`/Model?model=${currentData?.file_guid}`} >{t('painting-update:view-model')}</Link>
      ;
  }

  if (loading) {
    return (
      <div className={styles.mainBody}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={styles.mainBody}>
      <div className={styles.deleteButtonHover}>
        <Button color='secondary' variant='contained' onClick={() => { deletePainting(); }}>{t('painting-update:delete')}</Button>
      </div>
      <div className={styles.header}>{t('painting-update:title')}</div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} >
            <TextField fullWidth={true} id="outlined-basic" label={t('painting-update:name')} variant="outlined" value={painting.name} required onChange={(event) => { setPainting(x => { return { ...x, name: event.target.value } }); }} />
          </Grid>
          <Grid item xs={12} md={6} >
            <TextField fullWidth={true} id="outlined-basic" label={t('painting-update:author')} variant="outlined" value={painting.author} required onChange={(event) => { setPainting(x => { return { ...x, author: event.target.value } }); }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth={true} multiline={true} minRows={2} id="outlined-basic" label={t('painting-update:description')} variant="outlined" value={painting.description} required onChange={(event) => { setPainting(x => { return { ...x, description: event.target.value } }); }} />
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleFileSelect} />
          </Grid>
          <Grid item xs={12}>
            {showModelLink()}
          </Grid>
        </Grid>
      </Box>

      <Button color='primary' variant='contained' onClick={() => { updatePainting(); }}>{t('painting-update:update')}</Button>

      <Snackbar open={!!alertErrorMessage} autoHideDuration={null} onClose={() => setAlertErrorMessage(undefined)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setAlertErrorMessage(undefined)} severity="error" >
          {alertErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PaintingUpdate;
