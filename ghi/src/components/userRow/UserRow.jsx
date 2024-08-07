import React from "react";
import { useDeleteAccountMutation } from "../../app/authSlice";

const UserRow = ({ item, role }) => {
  const [deleteUser] = useDeleteAccountMutation();

  const handleDelete = (username) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      deleteUser(username)
        .unwrap()
        .then(() => {
          console.log(`User ${username} deleted successfully`);
        })
        .catch((error) => {
          console.error("Failed to delete user: ", error);
        });
    }
  };

  const {
    first_name,
    last_name,
    email,
    phone_number,
    username,
    orders_in_progress,
    orders_completed,
  } = item;

  return (
    <tr>
      <td>
        {first_name} {last_name}
      </td>
      {role === "shaper" ? (
        <>
          <td>{orders_in_progress}</td>
          <td>{orders_completed}</td>
        </>
      ) : (
        <td>{role}</td>
      )}
      <td>{email}</td>
      <td>{phone_number}</td>
      {role === "admin" && (
        <td>
          <button onClick={() => handleDelete(username)}>Delete</button>
        </td>
      )}
    </tr>
  );
};

export default UserRow;
