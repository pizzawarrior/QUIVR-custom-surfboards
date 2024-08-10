import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../app/authSlice";
import { useGetAccountsByRoleQuery } from "../../app/authSlice";
import { useGetAllMessagesQuery } from "../../app/messagesSlice";
import { useGetAllOrdersQuery } from "../../app/ordersSlice";
import SendMessageModal from "../../components/sendMessageModal/SendMessageModal";
import SentMessages from "../../components/sentMessages/SentMessages";
import ReceivedMessages from "../../components/receivedMessages/ReceivedMessages";
import { Wrapper } from "../../constants";
import { H1, Button1, Background } from "./style";

const Messages = () => {
  const navigate = useNavigate();
  const { data: account, isLoading: isTokenLoading } = useGetTokenQuery();
  const { data: shaper, isLoading: isShaperLoading } =
    useGetAccountsByRoleQuery("shaper");
  const { data: allMessages, isLoading: messagesLoading } =
    useGetAllMessagesQuery();
  const { data: orders, isLoading: ordersLoading } = useGetAllOrdersQuery();

  const [showModal, setShowModal] = useState(false);
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const addNewMessage = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!isTokenLoading && !account) {
      navigate("/");
    }

    if (allMessages && !isTokenLoading) {
      const sentList = allMessages.filter(
        (message) => message.sender === account?.username
      );
      setSentMessages(sentList);

      const receivedList = allMessages.filter(
        (message) => message.recipient === account?.username
      );
      setReceivedMessages(receivedList);
    }
  }, [account, isTokenLoading, navigate, allMessages]);

  if (isTokenLoading || isShaperLoading || messagesLoading || ordersLoading)
    return (
      <Background>
        <Wrapper>
          <h1>Loading...</h1>
        </Wrapper>
      </Background>
    );

  return (
    <Background>
      <Wrapper>
        {account && (
          <>
            <div>
              <H1>Welcome, {account.username}</H1>
              <Button1 onClick={addNewMessage}>New Message</Button1>
              {showModal && (
                <SendMessageModal
                  account={account}
                  orders={orders}
                  shaper={shaper}
                  setShowModal={setShowModal}
                />
              )}
            </div>
            {sentMessages.length > 0 && (
              <SentMessages messages={sentMessages} />
            )}
            <br />
            {receivedMessages.length > 0 && (
              <ReceivedMessages messages={receivedMessages} />
            )}
          </>
        )}
      </Wrapper>
    </Background>
  );
};

export default Messages;
