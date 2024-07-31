import React, { useState } from "react";
import { useEffect } from "react";
import { Button1, Wrapper } from "./style";
import { useCreateMessageMutation } from "../../app/messagesSlice";
// import { useGetAccountsByRoleQuery } from "../../app/authSlice";

// if role == customer, then recipient is a list of shapers
// if role == shaper, then recipient is a list of customers where order["customer"] == customer && order["shaper"] == shaper

const SendMessageModal = ({ setShowModal, shaper }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [createMessage, result] = useCreateMessageMutation();

  const handleCancel = () => {
    setTitle("");
    setBody(null);
    setRecipient(null);
    setShowModal(false);
  };

  // const handleCreate = () => {
  //   const message = {
  //     title: title,
  //     body: body,
  //     recipient: recipient,
  //   };

  //   createMessage(message);

  // setShowModal(false)

  const handleCreate = async (e) => {
    e.preventDefault();
    const message = {
      title: title,
      body: body,
      recipient: recipient,
    };

    createMessage(message);
  };

  useEffect(() => {
    if (result.isSuccess) {
      setShowModal(false);
    } else if (result.isError) {
      setErrorMessage("There was an error sending your message");
    }
  }, [result, setShowModal]);

  return (
    <Wrapper>
      {/* TODO: change this to use the IconButton from CartDetails (make it a constant) */}
      <h2 onClick={() => setShowModal(false)}>X</h2>
      <h1>New Message</h1>
      {errorMessage && <h3>{errorMessage}</h3>}
      <select
        onChange={(e) => setRecipient(e.target.value)}
        name="recipient"
        id="recipient"
        value={recipient}
      >
        <option>Choose a recipient...</option>
        {shaper &&
          shaper.map((message) => {
            return (
              <option key={message.username} value={message.username}>
                {message.username}
              </option>
            );
          })}
      </select>
      <br />

      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="subject..."
      />
      <br />

      <textarea
        type="text"
        onChange={(e) => setBody(e.target.value)}
        value={body}
        placeholder="message..."
      ></textarea>
      <br />

      <Button1 onClick={(e) => handleCreate(e)}>Send</Button1>
      <br />
      <Button1 onClick={(e) => handleCancel(e)}>Cancel</Button1>
    </Wrapper>
  );
};

export default SendMessageModal;
