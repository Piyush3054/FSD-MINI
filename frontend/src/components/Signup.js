// Signup.js

import React, { useState } from 'react';
import '../styles/Signup.css';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("sending server with: ", user);

        try {
            // Make a POST request to the signup endpoint
            const response = await fetch('http://localhost:8080/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You can add other headers if needed
                },
                body: JSON.stringify(user), // Include the user data in the request body

            });

            console.log(response.data);

            if (response.ok) {
                // Handle success
                const responseData = await response.json();
                console.log(responseData.data);
                navigate("/login");
            } else {
                // Handle error
                const errorData = await response.json();
                console.error('Error during signup:', errorData.error);
            }

        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error during signup:', error.message);
        }
    };


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={user.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
