import React, { useState } from "react";
import { useEffect } from "react";
import { Wrapper } from "./style";
import { Button1 } from "../../constants";
import { useCreateMessageMutation } from "../../app/messagesSlice";

// TODO: change all <br /> to spacers

const SendMessageModal = ({ setShowModal, account, orders, shaper }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(undefined);
  const [recipient, setRecipient] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [createMessage, result] = useCreateMessageMutation();

  const handleCancel = () => {
    setTitle("");
    setBody(undefined);
    setRecipient(undefined);
    setShowModal(false);
  };

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

  const renderRecipientOptions = (usernames) => {
    return usernames.map((username) => (
      <option key={username} value={username}>
        {username}
      </option>
    ));
  };

  const recipientSelect = (usernames) => (
    <select
      onChange={(e) => setRecipient(e.target.value)}
      name="recipient"
      id="recipient"
      value={recipient}
    >
      <option>Choose a recipient...</option>
      {renderRecipientOptions(usernames)}
    </select>
  );

  const getRecipientUsernames = () => {
    if (orders || account) {
      // if current user is 'customer' return set of shaper's usernames
      if (account?.role === "customer") {
        return [
          ...new Set(shaper.map((shaper_username) => shaper_username.username)),
        ];
        // otherwise if current user is shaper, return a set of usernames of their own customers
      } else if (account?.role === "shaper") {
        const filteredOrders = orders.filter(
          (order) => order.surfboard_shaper === account.username
        );
        return [
          ...new Set(filteredOrders.map((order) => order.customer_username)),
        ];
      }
    }
    return [];
  };

  const recipientUsernames = getRecipientUsernames();

  return (
    <Wrapper>
      {/* TODO: change this to use the IconButton from CartDetails (make it a constant) */}
      <h2 onClick={() => setShowModal(false)}>X</h2>
      <h1>New Message</h1>
      {errorMessage && <h3>{errorMessage}</h3>}
      {recipientSelect(recipientUsernames)}
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
