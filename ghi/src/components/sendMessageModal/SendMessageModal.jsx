import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "../../app/authSlice";

const sendMessageModal = ({ setShowMessageModal, sender, recipient }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [message] = useCreateMessageMutation();

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

  return <div>message</div>;
};

export default sendMessageModal;
