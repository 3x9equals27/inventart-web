import styles from './Diagnostics.module.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GridCore } from '../../components/GridCore/GridCore';
import { Loading } from '../../components/Loading/Loading';
import { Column, DetailPanel } from '@material-table/core';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import _ from 'lodash';
import { config } from '../../config';
import { Link } from 'react-router-dom';



const Diagnostics = () => {
    const [gridData, setGridData] = useState<Array<any>>([]);

    useEffect(() => {
        axios.get(`${config.apiRoot}/Diagnostico/list`)
        .then(res => {
            setGridData(res.data);
        });
    }, []);

    return (
    <div className={styles.mainBody}>
        <div>
            WIP: filters can go here
            <GridCore data={gridData} columns={gridColumns} detailPanel={gridDetailPanel} onRowClick={gridRowClick}></GridCore>
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
        render: (rowData) => <div>{_.get(rowData, 'has_file')?'yes':'no'}</div>, 
    },
    {
        field: 'file_guid',
        title: 'View Model',
        render: (rowData) => { 
            return !rowData.file_guid ? null :
            <Link to={`/Model?model=${rowData.file_guid}`} >View Model</Link>
            ; 
        }
    }
  ];

  const promisseModelViewer = async(rowId:number, fileGuid:string):Promise<JSX.Element> => {
    return axios.get(`${config.apiRoot}/File/link/${fileGuid}`)
    .then(async res => { 
        return (
            <div className={styles.detailPanel}>
                <div style={{width:'300px' }}>
                    <ModelViewer idx={rowId} url={res.data} showEmbeddedButtons={true} />
                </div>
            </div>
        );
    });
}

function gridRowClick(event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void){
    toggleDetailPanel?.(0);
}

const gridDetailPanel: DetailPanel<any>[] = [
    {
        tooltip: 'Show Model',
        render: (rowData:any) => {
            if(!rowData.file_guid){
                return <div>Nothing to see here</div>
            }
            return <Loading condition={() => promisseModelViewer(rowData.tableData.id, rowData.file_guid)} />;
        },
    }
];
