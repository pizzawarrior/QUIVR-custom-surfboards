import { useMemo } from "react";
import SentMessagesTable from "../sentMessagesTable/SentMessagesTable";

const SentMessages = ({ messages }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Sent Messages",
        columns: [
          {
            Header: "Sent To",
            accessor: "recipient",
          },
          {
            Header: "Subject",
            accessor: "title",
          },
          {
            Header: "Sent",
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

export default SentMessages;
