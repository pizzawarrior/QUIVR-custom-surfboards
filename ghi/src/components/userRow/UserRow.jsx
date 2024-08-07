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

  //   const { first_name, last_name, email, phone_number, username, order_count } =
  //     item;

  return (
    <tr>
      <td>
        {item.first_name} {item.last_name}
      </td>
      {role === "shaper" ? (
        <>
          <td>{item.order_count}</td>
          <td>{item.completed_count}</td>
        </>
      ) : (
        <td>{item.role}</td>
      )}
      <td>{item.email}</td>
      <td>{item.phone_number}</td>
      {role === "admin" && (
        <td>
          <button onClick={() => handleDelete(item.username)}>Delete</button>
        </td>
      )}
    </tr>
  );
};

export default UserRow;
