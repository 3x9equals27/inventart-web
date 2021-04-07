import React from 'react';
import MaterialTable, { Column, Components, DetailPanel, MTableBody } from '@material-table/core';
import { Paper } from '@material-ui/core';
import styles from './GridCore.module.css';
import { TableIcons } from './GridCoreIcons';

export interface GridCoreProps<RowData extends object> {
  columns: Column<any>[];
  data: any[];
  detailPanel?: DetailPanel<RowData>[];
  onRowClick?: (
    event?: React.MouseEvent,
    rowData?: RowData,
    toggleDetailPanel?: (panelIndex?: number) => void
  ) => void;
}

export const GridCore: React.FC<GridCoreProps<any>> = ({ 
  columns, 
  data, 
  detailPanel,
  onRowClick
}) => {
  var components: Components = {};
  components.Container = (props) => <Paper {...props} className={styles.gridCore} />;
  components.Body = (props) => <MTableBody {...props} bulkEditChangedRows={[]}></MTableBody>;

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
      detailPanel={detailPanel}
      onRowClick={onRowClick}
    />
  );
};

