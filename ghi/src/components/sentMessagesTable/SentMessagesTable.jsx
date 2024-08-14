import { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { ReactTable, TableInput } from "../../constants";

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
    <div>
      <TableInput
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Search by recipient..."
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
                      : column.Header === "Sent Messages" // Check if it's the top header
                      ? "messages-header" // Add specific class here for styling purposes
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
    </div>
  );
};

export default SentMessagesTable;
