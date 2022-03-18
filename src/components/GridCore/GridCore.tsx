import React from 'react';
import MaterialTable, { Action, Column, Components, DetailPanel, MTableBody } from '@material-table/core';
import { Paper } from '@material-ui/core';
import styles from './GridCore.module.scss';
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
  actions?: (
    | Action<RowData>
    | ((rowData: RowData) => Action<RowData>)
    | { action: (rowData: RowData) => Action<RowData>; position: string }
  )[];
  title?: string | React.ReactElement<any>;
  searchPlaceholder?: string;
}

export const GridCore: React.FC<GridCoreProps<any>> = ({
  columns,
  data,
  detailPanel,
  onRowClick,
  actions,
  title,
  searchPlaceholder,
}) => {
  var components: Components = {};
  components.Container = (props) => <Paper {...props} className={styles.gridCore} />;
  components.Body = (props) => <MTableBody {...props} bulkEditChangedRows={{}}></MTableBody>;

  return (
    <MaterialTable
      icons={TableIcons}
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
        minBodyHeight: 'calc(100vh - 230px)',
        maxBodyHeight: 'calc(100vh - 230px)',
        emptyRowsWhenPaging: false,
        //columnsButton: true,
        // toolbar: false,
        // search: false,
        // showTitle: false,
        pageSize: 10,
        // emptyRowsWhenPaging: false,
        // pageSizeOptions: [],
        paginationPosition: 'bottom',
      }}
      // https://material-table.com/#/docs/features/component-overriding
      components={components}
      detailPanel={detailPanel}
      onRowClick={onRowClick}
      actions={actions}
      title={title ?? ''}
      localization={{
        toolbar: {
          searchPlaceholder: searchPlaceholder
        },
        header: {
          actions: ''
        }
      }}
    />
  );
};

