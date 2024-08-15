import { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { ReactTable, TableInput } from "../../constants";

const ReceivedMessagesTable = ({ columns, messages }) => {
  const [filterInput, setFilterInput] = useState("");
  const [expandedRows, setExpandedRows] = useState({});

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
    setFilter("sender", value);
    setFilterInput(value);
  };

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  return (
    <div>
      <TableInput
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Search by sender"
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
                      : column.Header === "Received Messages" // Check if it's the top header
                      ? "messages-header" // Add specific class here to grab for styling
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
            const isExpanded = expandedRows[i];
            return (
              <tr {...row.getRowProps()} onClick={() => toggleRowExpansion(i)}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.column.id === "body"
                      ? isExpanded
                        ? cell.value
                        : `${cell.value.slice(0, 40)}...`
                      : cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </ReactTable>
    </div>
  );
};

export default ReceivedMessagesTable;
