import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../app/authSlice";
import { useGetAccountsByRoleQuery } from "../../app/authSlice";
import { useGetAllMessagesQuery } from "../../app/messagesSlice";
import SendMessageModal from "../../components/sendMessageModal/SendMessageModal";
import { Wrapper, Button1, ReactTable } from "../../constants";
import SentMessages from "../../components/sentMessages/SentMessages";

const Messages = () => {
  const navigate = useNavigate();
  const { data: account, isLoading: isTokenLoading } = useGetTokenQuery();
  const { data: shaper, isLoading: isShaperLoading } =
    useGetAccountsByRoleQuery("shaper");
  const { data: allMessages, isLoading: messagesLoading } =
    useGetAllMessagesQuery();

  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);

  const addNewMessage = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!isTokenLoading && !account) {
      navigate("/");
    }

    if (allMessages && !isTokenLoading) {
      let list = allMessages.filter(
        (message) => message.sender === account.username
      );
      setMessages(list);
    } else {
      setMessages(allMessages);
    }
  }, [account, isTokenLoading, navigate, allMessages]);

  if (isTokenLoading || isShaperLoading || messagesLoading)
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );

  return (
    <Wrapper>
      {account && (
        <>
          <Button1 onClick={addNewMessage}>New Message</Button1>
          {showModal && (
            <SendMessageModal shaper={shaper} setShowModal={setShowModal} />
          )}
          {messages && messages.length > 0 && (
            <SentMessages messages={messages} />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Messages;
