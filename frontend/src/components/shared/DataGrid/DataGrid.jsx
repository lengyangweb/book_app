import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { Card } from "react-bootstrap";
import DataGridStyle from "../../styles/DataGrid.styled";

const DataGrid = ({
  data,
  columns,
  selectionMode,
  selection,
  setSelection,
  minWidth,
  maxHeight,
}) => {
  return (
    <DataGridStyle>
      <Card className="shadow">
        <DataTable
          value={data}
          selection={selection}
          scrollable={true}
          scrollHeight={maxHeight}
          onSelectionChange={(e) => setSelection(e.value)}
          selectionMode={selectionMode}
          tableStyle={{ minWidth: minWidth }}
        >
          {columns.map(({ label, value }) => (
            <Column key={value} field={value} sortable header={label} />
          ))}
        </DataTable>
      </Card>
    </DataGridStyle>
  );
};

export default DataGrid;
