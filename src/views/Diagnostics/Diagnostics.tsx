import styles from './Diagnostics.module.css';
import React, { useEffect, useState } from 'react';
import { GridCore } from '../../components/GridCore/GridCore';
import { Loading } from '../../components/Loading/Loading';
import { Column, DetailPanel } from '@material-table/core';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';

const Diagnostics = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
    const [gridData, setGridData] = useState<Array<any>>([]);

    console.warn('Diagnostics', inventartApi);
    ///@ts-ignore
    window.test = inventartApi;

    useEffect(() => {
        (async () => {
            var response = await inventartApi.diagnosticoList();
            if(response.success){
              setGridData(response.payload);
            } else {
              //wip
            }

        })();
    }, [inventartApi]);

    const promisseModelViewer = async (rowId: number, fileGuid: string): Promise<JSX.Element> => {
      var response = await inventartApi.fileLink(fileGuid);
  
      return (
          <div className={styles.detailPanel}>
              <div style={{ width: '300px' }}>
                  <ModelViewer idx={rowId} url={response.payload} showEmbeddedButtons={true} />
              </div>
          </div>
      );
  };
  const gridDetailPanel = (): DetailPanel<any>[] => {
    return [
        {
            tooltip: 'Show Model',
            render: (rowData: any) => {
                if (!rowData.file_guid) {
                    return <div>Nothing to see here</div>
                }
                return <Loading condition={() => promisseModelViewer(rowData.tableData.id, rowData.file_guid)} />;
            },
        }
    ];
};

    return (!gridData ? <></> :
        <div className={styles.mainBody}>
            <div>
                WIP: filters can go here
            <GridCore data={gridData} columns={gridColumns} detailPanel={gridDetailPanel()} onRowClick={gridRowClick}></GridCore>
            </div>
        </div>);
};

export default Diagnostics;

const gridColumns: Array<Column<any>> = [
    {
        field: 'description',
        title: 'desc',
        type: 'string',
    },
    {
        field: 'guid',
        title: 'id',
        type: 'string',
    },
    {
        field: 'has_file',
        title: 'Has file',
        render: (rowData: any) => <div>{_.get(rowData, 'has_file') ? 'yes' : 'no'}</div>,
    },
    {
        field: 'file_guid',
        title: 'View Model',
        render: (rowData: any) => {
            return !rowData.file_guid ? null :
                <Link to={`/Model?model=${rowData.file_guid}`} >View Model</Link>
                ;
        }
    }
];



function gridRowClick(event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void) {
    toggleDetailPanel?.(0);
}

