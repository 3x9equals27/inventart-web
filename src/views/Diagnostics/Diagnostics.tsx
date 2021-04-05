import styles from './Diagnostics.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GridCore } from '../../components/GridCore/GridCore';
import { Column } from '@material-table/core';
import _ from 'lodash';



const Diagnostics = () => {
    const [gridData, setGridData] = useState<Array<any>>([]);
    console.warn('draing diagnostics');

    useEffect(() => {
        axios.get(`https://inventart-api.azurewebsites.net/Diagnostico/list`)
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
        title: 'boolean render',
        render: (rowData) => <div>{_.get(rowData, 'has_file')?'yes':'no'}</div>, //with lodash _.get(rowData, 'has_file')
    }
  ];
