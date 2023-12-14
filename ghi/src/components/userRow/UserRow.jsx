import React from 'react';
import { useDeleteAccountMutation } from '../../app/authSlice';

const UserRow = ({ item, role }) => {
    const [deleteUser] = useDeleteAccountMutation();

    const handleDelete = (username) => {
        deleteUser(username);
    };

    return (
        <tr>
            <td>
                {item.first_name} {item.last_name}
            </td>
            {role === 'shaper' ? (
                <>
                    <td>1</td>
                    <td>2</td>
                </>
            ) : (
                <td>{item.role}</td>
            )}
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            {role === 'admin' && (
                <td>
                    <button onClick={() => handleDelete(item.username)}>
                        Delete
                    </button>
                </td>
            )}
        </tr>
    );
};

export default UserRow;
