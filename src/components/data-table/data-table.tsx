import "./data-table.style.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css";
type DataTableProps = {
  columnDefs: any[];
  rowData: any[];
};

const DataTable = ({ rowData, columnDefs }: DataTableProps) => {
  return (
    <div className={`ag-theme-alpine pb-12`}>
      <AgGridReact
        suppressColumnVirtualisation={true}
        className="font-sans text-xs"
        getRowId={(params) => params.data._id}
        rowData={Array.isArray(rowData) ? rowData : []} // Ensure rowData is an array
        accentedSort
        domLayout={rowData?.length ? "autoHeight" : undefined}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default DataTable;
