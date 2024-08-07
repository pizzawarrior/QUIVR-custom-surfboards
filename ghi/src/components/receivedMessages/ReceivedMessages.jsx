import { useMemo } from "react";
import SentMessagesTable from "../sentMessagesTable/SentMessagesTable";

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
    return <h1>No messages to display.</h1>; // Message when there are no messages
  }

  return <SentMessagesTable columns={columns} messages={messages} />;
};

export default ReceivedMessages;
