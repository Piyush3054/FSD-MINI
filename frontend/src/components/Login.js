import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log(credentials);
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                console.log("got ok");
                const responseData = await response.json();
                const { token } = responseData;
                sessionStorage.setItem('token', token);
                const [username, expirationTimestamp] = token.split('|');

                console.log('Username:', username);
                navigate("/welcome");
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>User Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                </label>
                <button type="submit">Login</button>
                <div> don't have account ? <button onClick={() => {navigate("/signup")}}>Sign UP</button></div>
            </form>
        </div>
    );
};

export default Login;
