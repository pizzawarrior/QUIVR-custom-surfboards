import { useMemo } from "react";
import MessagesTable from "../messagesTable/messagesTable";

const ReceivedMessages = ({ messages }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Received Messages",
        columns: [
          {
            Header: "Received From",
            accessor: "sender",
          },
          {
            Header: "Subject",
            accessor: "title",
          },
          {
            Header: "Message",
            accessor: "body",
          },
          {
            Header: "Date",
            accessor: "date",
          },
        ],
      },
    ],
    []
  );

  if (!messages || messages.length === 0) {
    return <h1>No messages to display.</h1>;
  }

  return (
    <MessagesTable columns={columns} messages={messages} filterKey="sender" />
  );
};

export default ReceivedMessages;
