import styles from './PaintingList.module.css';
import React, { useEffect, useState } from 'react';
import { GridCore } from '../../components/GridCore/GridCore';
import { Loading } from '../../components/Loading/Loading';
import { Column, DetailPanel } from '@material-table/core';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { AddBox, Edit } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Permission } from '../../services/Authentication/Permission';

const PaintingList = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [gridData, setGridData] = useState<Array<any>>([]);

  const gridColumns: Array<Column<any>> = [
    {
      field: 'name',
      title: t('painting-list:name'),
      type: 'string',
    },
    {
      field: 'author',
      title: t('painting-list:author'),
      type: 'string',
    },
    {
      field: 'description',
      title: t('painting-list:description'),
      type: 'string',
    },
    // {
    //   field: 'guid',
    //   title: 'id',
    //   type: 'string',
    // },
    // {
    //   field: 'has_file',
    //   title: 'Has file',
    //   render: (rowData: any) => <div>{_.get(rowData, 'has_file') ? 'yes' : 'no'}</div>,
    // },
    {
      field: 'file_guid',
      title: t('painting-list:model'),
      render: (rowData: any) => {
        return !rowData?.file_guid ? null :
          <Link to={`/Model?model=${rowData?.file_guid}`} >{t('painting-list:view-model')}</Link>
          ;
      }
    }
  ];

  useEffect(() => {
    (async () => {
      var response = await inventartApi.paintingList();
      if (response.success) {
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
        tooltip: t('painting-list:show-model'),
        render: ({ rowData }) => {
          if (!rowData?.file_guid) {
            return <div>Nothing to see here</div>
          }
          return <Loading condition={() => promisseModelViewer(rowData.tableData.id, rowData.file_guid)} />;
        },
      }
    ];
  };

  const actionsBuilder = () => {
    let actions = [];

    //this Permission.UPLOAD_FILE should be Permission.ADD_PAINTING
    if(permissionManager.Check(Permission.UPLOAD_FILE)){
      actions.push({
        icon: AddBox,
        tooltip: t('painting-list:create-new'),
        isFreeAction: true,
        onClick: (event:any) => { history.push('/PaintingCreate') }
      });
    }
    //this Permission.UPLOAD_FILE should be Permission.EDIT_PAINTING
    if(permissionManager.Check(Permission.UPLOAD_FILE)){
      actions.push({
        icon: Edit,
        tooltip: t('painting-list:edit'),
        isFreeAction: false,
        onClick: (event:any, data:any) => { console.warn(data.guid); }
      });
    }

    return actions;
  }

  return (!gridData ? <></> :
    <div className={styles.mainBody}>
      <div>
        {/* WIP: filters can go here */}
        <GridCore data={gridData}
          columns={gridColumns}
          detailPanel={gridDetailPanel()}
          onRowClick={gridRowClick}
          actions={actionsBuilder()}
        />
      </div>
    </div>);
};

export default PaintingList;


function gridRowClick(event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void) {
  toggleDetailPanel?.(0);
}

