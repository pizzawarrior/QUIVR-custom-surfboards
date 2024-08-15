import { useMemo } from "react";
import MessagesTable from "../messagesTable/messagesTable";

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
    <MessagesTable
      columns={columns}
      messages={messages}
      filterKey="recipient"
    />
  );
};

export default SentMessages;
