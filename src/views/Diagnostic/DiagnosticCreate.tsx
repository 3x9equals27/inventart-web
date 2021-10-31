import styles from './DiagnosticList.module.css';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';

const DiagnosticCreate = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [diagnostic, setDiagnostic] = useState<{ description: string }>({
    description: ''
  });

  console.warn('diagnostic.description: ', diagnostic.description);

  /*
  useEffect(() => {
    (async () => {
      var response = await inventartApi.diagnosticCreate('and another one');
      console.warn(response);

    })();
  }, [inventartApi]);
*/

  async function createNewDiagnostic(){
    var response = await inventartApi.diagnosticCreate(diagnostic.description);
    console.warn(response);
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
            3
          </Grid>
          <Grid item xs={12} sm={6}>
            4
          </Grid>
        </Grid>
      </Box>

      <Button variant='outlined' onClick={() => { createNewDiagnostic(); }}>Register</Button>
    </div>
  );
};

export default DiagnosticCreate;
