import { useState, useEffect } from 'react';
import { useLoginMutation, useSignupMutation } from '../../app/authSlice';
import { useNavigate } from 'react-router-dom';
import { SignUp, LandBackground } from './style';
import { AccountForm } from '../../constants';

const Login = () => {
    const navigate = useNavigate();
    const [login, loginResponse] = useLoginMutation();
    const [signup, signupResponse] = useSignupMutation();
    const [loggingIn, setLoggingIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (loginResponse.isSuccess) navigate('/');
        if (signupResponse.isSuccess) navigate('/');
    }, [loginResponse, navigate, signupResponse.isSuccess]);

    const handleLogin = () => {
        login({ username, password });
    };

    const handleSubmit = () => {
        let role = 'customer';
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
    };

    return (
        <>
            <LandBackground></LandBackground>
            <AccountForm>
                <h1>Welcome!</h1>
                <p>Username:</p>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                {!loggingIn && (
                    <>
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
                    </>
                )}
                <p>Password:</p>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!loggingIn && (
                    <>
                        <p>Confirm Password:</p>
                        <input
                            type='password'
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />
                    </>
                )}
                <br />
                <button
                    onClick={() => (loggingIn ? handleLogin() : handleSubmit())}
                >
                    {loggingIn ? 'Login' : 'Sign Up'}
                </button>
                {errorMessage && (
                    <div
                        className='alert alert-danger'
                        role='alert'
                    >
                        {errorMessage}
                    </div>
                )}
                <SignUp onClick={() => setLoggingIn(!loggingIn)}>
                    {loggingIn ? 'Need to Sign Up?' : 'Login Instead'}
                </SignUp>
            </AccountForm>
        </>
    );
};

export default Login;
