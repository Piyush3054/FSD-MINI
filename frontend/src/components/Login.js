import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Toaster from "./Toaster";

const Login = () => {
    const navigate = useNavigate();
    const [logInStatus,setLogInStatus] = useState("");

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
                setLogInStatus({ msg: "Success", key: Math.random() });
                sessionStorage.setItem('token', token);
                const [username, expirationTimestamp] = token.split('|');
                navigate("/welcome");
            }else{
                setLogInStatus({
                    msg: "Invalid User name or Password",
                    key: Math.random(),
                });
            }
        } catch (error) {

            console.error('Error during login:', error.message);
        }
    };

    return (
        <>
        <center>
            <div className="login-container">
                <h2>User Login</h2>
                <form onSubmit={handleLogin}>
                    <label style={{fontSize:"21px"}}>
                        Username
                        <input type="text" name="username" value={credentials.username} onChange={handleChange} style={{marginLeft:"1vw"}}/>
                    </label>
                    <label style={{fontSize:"21px"}}>
                        Password
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} style={{marginLeft:"1vw"}}/>
                    </label>
                    <button type="submit">Login</button>
                    <div style={{marginTop:"10px"}}> don't have account ? <button onClick={() => {
                        navigate("/signup")
                    }}>Sign UP</button></div>
                </form>
            </div>
        </center>
            {logInStatus ? (
                <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
        </>
    );
};

export default Login;
