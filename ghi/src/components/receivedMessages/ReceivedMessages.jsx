import { useMemo } from "react";
import ReceivedMessagesTable from "../receivedMessagesTable/ReceivedMessagesTable";

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

  return <ReceivedMessagesTable columns={columns} messages={messages} />;
};

export default ReceivedMessages;
