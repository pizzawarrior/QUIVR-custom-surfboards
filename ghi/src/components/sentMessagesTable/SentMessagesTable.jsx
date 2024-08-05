import { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { ReactTable } from "../../constants";

// for styling use reactTable in /constants

const SentMessagesTable = ({ columns, messages }) => {
  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data: messages,
    },
    useFilters,
    useSortBy
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("recipient", value);
    setFilterInput(value);
  };

  return (
    <>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Search by Shaper"
      />
      <ReactTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </ReactTable>
    </>
  );
};

export default SentMessagesTable;
