import React from 'react';
import MaterialTable, { Column, Components } from '@material-table/core';
import { Paper } from '@material-ui/core';
import styles from './GridCore.module.css';
import { TableIcons } from './GridCoreIcons';

export interface GridCoreProps {
  columns: Column<any>[];
  data: any[];
//  paginationOverride?: JSX.Element;
}

export const GridCore: React.FC<GridCoreProps> = ({ 
  columns, 
  data, 
 // paginationOverride 
}) => {
  var components: Components = {};
  components.Container = (props) => <Paper {...props} className={styles.gridCore} />;
  //if (paginationOverride) components.Pagination = () => <td style={{ display: 'flex' }}>{paginationOverride}</td>; // Warning: validateDOMNesting(...): <div> cannot appear as a child of <tr>.

  return (
    <MaterialTable
      icons={TableIcons}
      columns={columns}
      data={data}
      options={{
        maxBodyHeight: 800,
        emptyRowsWhenPaging: false,
        //columnsButton: true,
        // toolbar: false,
        // search: false,
        // showTitle: false,
        // pageSize: 6,
        // emptyRowsWhenPaging: false,
        // pageSizeOptions: [],
        // paginationPosition: 'bottom',
      }}
      // https://material-table.com/#/docs/features/component-overriding
      components={components}
    />
  );
};
