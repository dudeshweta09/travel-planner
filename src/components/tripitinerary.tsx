"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

 type TripData = {
  [x: string]: any;
  id: number;
  date: string;
  place: string;
  time: string;
};

export const defaultData: TripData[] =
  JSON.parse(localStorage.getItem("Itinerary_List")!) || [];

const coulumnHelper = createColumnHelper<TripData>();

const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

   useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  return (
    <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
  );
};

const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;

  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.place);
  };

  
  return (
    <div>
      {meta?.editedRows[row.id] ? (
        <div>
          <button onClick={setEditedRows} name="cancel">
            -
          </button>{" "}
          <button onClick={setEditedRows} name="done">
            ok
          </button>
        </div>
      ) : (
        <div>
          <button onClick={setEditedRows} name="edit">
            edit
          </button>
          <button onClick={removeRow} name="remove">
            X
          </button>
          
        </div>
      )}
    </div>
  );
};

// const FooterCell = ({ table }: any) => {
//   const meta = table.options.meta;
//   return (
//     <div>
//       <button onClick={meta?.addRow}>Add New +</button>
//     </div>
//   );
// };

const columns = [
  coulumnHelper.accessor("date", {
    header: "Date",
    cell: TableCell,
    meta: {
      type: "date",
    },
  }),
  coulumnHelper.accessor("place", {
    header: "Place",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  coulumnHelper.accessor("time", {
    header: "Time",
    cell: TableCell,
    meta: {
      type: "time",
    },
  }),
  coulumnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

const Table = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});
   
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index == rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow: TripData = {
          id:Math.floor(Math.random()*10000),
          date: "",
          place: "",
          time: "",
        };
        const setFunc = (old: TripData[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (place:string) => {
        let rowData = JSON.parse(localStorage.getItem("Itinerary_List")!||"[]")
        // defaultData = rowData.filter((dt:TripData)=>{
        //   return dt.place !== place
        // })
        localStorage.setItem("Itinerary_List",JSON.stringify(defaultData))
        
      },
    },
  });

  return (
    <table className="w-11/12">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {/* <tfoot>
        <tr>
          <th colSpan={table.getCenterLeafColumns().length} align="right">
            <FooterCell table={table} />
          </th>
        </tr>
      </tfoot> */}
    </table>
  );
};

export default Table;
