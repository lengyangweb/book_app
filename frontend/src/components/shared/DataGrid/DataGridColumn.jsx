import { Column } from "primereact/column";
import React from "react";

const DataGridColumn = ({ column }) => {
  return <Column field={value} header={column.label} />;
};

export default DataGridColumn;
