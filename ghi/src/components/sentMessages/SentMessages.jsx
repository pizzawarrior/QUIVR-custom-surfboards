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
            Header: "Message",
            accessor: "body",
            Cell: ({ value }) => {
              return value.length > 40 ? `${value.slice(0, 40)}...` : value;
            },
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

  return <SentMessagesTable columns={columns} messages={messages} />;
};

export default SentMessages;
