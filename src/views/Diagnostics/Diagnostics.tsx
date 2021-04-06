import styles from './Diagnostics.module.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GridCore } from '../../components/GridCore/GridCore';
import { Loading } from '../../components/Loading/Loading';
import { Column } from '@material-table/core';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import _ from 'lodash';
import { config } from '../../config';
import { Link } from 'react-router-dom';
const delay = require('delay');



const Diagnostics = () => {
    const [gridData, setGridData] = useState<Array<any>>([]);
    console.warn('drawing diagnostics');

    useEffect(() => {
        axios.get(`${config.apiRoot}/Diagnostico/list`)
        .then(res => {
            console.warn(res.data);
            setGridData(res.data);
        });
    }, []);

    return (
    <div className={styles.mainBody}>
        <div>
            WIP: filters can go here
            <GridCore data={gridData} columns={gridColumns} ></GridCore>
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
        //render: (rowData) => { return <Loading condition={() => promisseModelViewer(rowData.tableData.id)} />; }
    },
    {
        field: 'file_guid',
        title: 'View Model',
        render: (rowData) => { return !rowData.file_guid ? null :
            // <Loading condition={() => promisseModelViewer(rowData.tableData.id)} /> : 
            <Link to={`/Model?model=${rowData.file_guid}`} >View Model</Link>
            ; 
        }
    }
  ];

  const promisseModelViewer = async(idx:number):Promise<JSX.Element> => {
    //   return axios.get(`https://inventart-api.azurewebsites.net/Diagnostico/list`)
    //   .then(async res => { 
    //       return <div>promiss returned</div>
    //     });

    let sleepTime = 2000;
    let url = 'https://res.cloudinary.com/inventart/raw/upload/v1617501330/3DHOP/gargo_daub17.nxz';
    if(idx===1) {
        url = 'https://res.cloudinary.com/inventart/image/upload/v1617566316/3DHOP/laurana_sh9bnm.ply';
        sleepTime = 4000;
    }
    if(idx===2) {
        url = 'https://res.cloudinary.com/inventart/raw/upload/v1617566207/3DHOP/luso_ffy1la.nxz';
        sleepTime = 5000;
    }

    await delay(sleepTime);

    return (<div style={{width:'300px' }}>
                <ModelViewer idx={idx} url={url} showEmbeddedButtons={true} />
    </div>);
  }

