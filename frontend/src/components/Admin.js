import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Toaster from "./Toaster";

const Admin = () => {
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
            const response = await fetch('http://localhost:8080/api/admin', {
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
                setLogInStatus({ msg: "Success", key: Math.random() });
                const [username, expirationTimestamp] = token.split('|');

                console.log('Username:', username);
                navigate("/adminWelcome");
            }
            else{
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
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <table>
                        <tr>
                            <td style={{fontSize:"21px",fontWeight:"bold"}}>Username</td>
                            <td><input type="text" name="username" value={credentials.username}
                                       onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontSize:"21px",fontWeight:"bold"}}>Password</td>
                            <td><input type="password" name="password" value={credentials.password}
                                       onChange={handleChange}/></td>
                        </tr>
                    </table>
                    <button type="submit">Login</button>
                </form>
            </div>
        </center>
            {logInStatus ? (
                <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
        </>
    );
};

export default Admin;
