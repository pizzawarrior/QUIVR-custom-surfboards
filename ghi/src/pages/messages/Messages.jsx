import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../app/authSlice";
import { useGetAccountsByRoleQuery } from "../../app/authSlice";
import SendMessageModal from "../../components/sendMessageModal/SendMessageModal";
import { Wrapper, Button1 } from "../../constants";

const Messages = () => {
  const navigate = useNavigate();

  const { data: account, isLoading: isTokenLoading } = useGetTokenQuery();
  const { data: shaper, isLoading: isShaperLoading } =
    useGetAccountsByRoleQuery("shaper");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isTokenLoading && !account) {
      navigate("/");
    }
  }, [account, isTokenLoading, navigate]);

  if (isTokenLoading || isShaperLoading) return <h1>Loading...</h1>;

  const addNewMessage = () => {
    setShowModal(true);
  };

  return (
    <Wrapper>
      <Button1 onClick={addNewMessage}>New Message</Button1>

      {showModal && (
        <SendMessageModal shaper={shaper} setShowModal={setShowModal} />
      )}
    </Wrapper>
  );
};

export default Messages;
