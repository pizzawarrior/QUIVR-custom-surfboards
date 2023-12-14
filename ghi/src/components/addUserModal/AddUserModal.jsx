import { useState } from 'react';
import { useSignupWithoutLoginMutation } from '../../app/authSlice';
import { ModalContainer, AccountForm } from '../../constants';

const AddUserModal = ({ setShowModal }) => {
    const [signup] = useSignupWithoutLoginMutation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState('');
    const roleOptions = ['customer', 'shaper', 'admin'];

    const handleSubmit = () => {
        if (password !== passwordConfirmation) {
            setErrorMessage('Password and confirmation do not match.');
            return;
        }
        signup({
            username,
            password,
            first_name,
            last_name,
            email,
            phone_number,
            role,
        });
        setShowModal(false);
    };

    return (
        <ModalContainer>
            <AccountForm>
                <div id='top'>
                    <h1>Create New User</h1>
                    <h1
                        id='close'
                        onClick={() => setShowModal(false)}
                    >
                        X
                    </h1>
                </div>
                <p>Username:</p>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <p>Email:</p>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>First Name:</p>
                <input
                    type='text'
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <p>Last Name:</p>
                <input
                    type='text'
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <p>Phone Number:</p>
                <input
                    type='text'
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <p>User Role:</p>
                <select
                    onChange={(e) => setRole(e.target.value)}
                    name='role'
                    id='role'
                    value={role}
                    required
                >
                    <option>Choose a status...</option>
                    {roleOptions.map((role, index) => (
                        <option
                            key={index}
                            value={role}
                        >
                            {role}
                        </option>
                    ))}
                </select>
                <p>Password:</p>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>Confirm Password:</p>
                <input
                    type='text'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <br />
                <button onClick={() => handleSubmit()}>Add User</button>
                {errorMessage && (
                    <div
                        className='alert alert-danger'
                        role='alert'
                    >
                        {errorMessage}
                    </div>
                )}
            </AccountForm>
        </ModalContainer>
    );
};

export default AddUserModal;
