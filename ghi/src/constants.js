import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 12px;
  min-height: 80vh;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 50px;
  padding: 12px;
  min-height: 20vh;
  background-color: #105469;
  border-radius: 8px;

  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #105469;
    font-family: "Open Sans", sans-serif;
  }
  table {
    background: #e76215;
    border-radius: 0.25em;
    border-collapse: collapse;
    margin: 1em;
  }
  th {
    border-bottom: 1px solid #364043;
    color: #e2b842;
    font-size: 0.85em;
    font-weight: 600;
    padding: 0.5em 1em;
    text-align: left;
  }
  td {
    color: #fff;
    font-weight: 400;
    padding: 0.65em 1em;
  }
  .disabled td {
    color: #4f5f64;
  }
  tbody tr {
    transition: background 0.25s ease;
  }
  tbody tr:hover {
    background: #e76215;
  }
  button {
    padding: 4px;
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #66bcd2;
  padding: 80px 100px;
  border-radius: 8px;
  border: 5px solid #f1e9d3;
  z-index: 1000;
  h2 {
    display: flex;
    justify-content: end;
  }
`;

export const AccountForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #002446;
  color: #f7e7be;
  text-align: center;
  align-items: center;
  padding: 32px 80px;
  border-radius: 8px;
  text-align: left;
  /* opacity: 0.9; */

  h1 {
    text-align: center;
  }

  button {
    margin: 18px 0;
    background-color: rgb(253, 137, 64);
    padding: 12px 24px;
    color: #fff;
    border-radius: 4px;
    letter-spacing: 1px;
    font-weight: bold;
    border: none;
  }

  input {
    width: 20vw;
  }

  #top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #close {
    cursor: pointer;
  }
`;

export const OrderStatusOptions = [
  "Order Received",
  "Foam being cut",
  "Sent to glassing",
  "Completed",
];

export const Button1 = styled.button`
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 1rem;
  background-color: #e76215;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-left: 90%;
`;

export const ReactTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border: 2px solid #f7e7be;
  border-radius: 7px;
  color: #0d5274;
  font-family: "Open Sans", sans-serif;
  table-layout: fixed; /* Ensures columns remain fixed width */

  .messages-header {
    font-size: 25px;
    color: #e76215;
  }

  tr {
    cursor: pointer;
  }

  tr:hover {
    background: #d1e3e8;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  th,
  td {
    text-align: left;
    margin: 0;
    padding: 0.5rem;
    border-bottom: 2px solid #f7e7be;
    border-right: 1px solid #f7e7be;
    position: relative;
    overflow: hidden; /* Hide overflow to prevent pushing */
    white-space: normal; /* Allow text to wrap */
    word-wrap: break-word; /* Ensure wrapping of long words */
  }

  th:last-child,
  td:last-child {
    border-right: 0;
  }

  tr:nth-child(even) {
    background-color: #e1eff2;
  }

  tr:nth-child(even):hover {
    background: #d1e3e8;
  }

  th::before {
    position: absolute;
    right: 15px;
    top: 16px;
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  th.sort-asc::before {
    border-bottom: 8px solid white;
  }

  th.sort-desc::before {
    border-top: 8px solid white;
  }
`;

export const TableInput = styled.input`
  text-align: center;
  padding: 5px;
  margin-top: 5em;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 2px solid #c2aeae;
  box-shadow: none;
  color: rgb(74, 71, 71);
  background-color: #e3e8e5;
`;
