import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../app/authSlice";

// TODO: use orderDetails as a reference

const Messages = () => {
  const navigate = useNavigate();

  const { data: account, isLoading: isTokenLoading } = useGetTokenQuery();
  const { data: shaper, isLoading } = useGetAccountsByRoleQuery("shaper");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [message] = useCreateMessageMutation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isTokenLoading && !account) {
      useNavigate("/");
    }
  }, [account, isTokenLoading, navigate]);

  if (isLoading || isTokenLoading) return <div>Loading...</div>;

  const handleClear = () => {
    setTitle("");
    setBody("");
    setIsRead(false);
  };

  async function handleAdd(e) {
    e.preventDefault();
    const message = {
      title,
      body,
      isRead,
      sender,
      recipient,
    };
  }

  return <div>Messages Go Here</div>;
};

export default Messages;
