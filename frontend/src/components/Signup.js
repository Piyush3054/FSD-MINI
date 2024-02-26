import React, { useState } from 'react';
import '../styles/Signup.css';
import {useNavigate} from "react-router-dom";
import Toaster from "./Toaster";
import Tooaster from "./Tooaster";

const Signup = () => {
    const navigate = useNavigate();
    const [signUpStatus,setSignUpStatus] = useState("");

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
                const responseData = await response.json();
                console.log(responseData.data);
                setSignUpStatus({msg:"User Added",key:Math.random()});
                navigate("/login");
            } else {
                setSignUpStatus(
                    {
                       msg:"User not Added",
                       key:Math.random()
                    });
                const errorData = await response.json();
                console.error('Error during signup:', errorData.error);
            }

        } catch (error) {
            console.error('Error during signup:', error.message);
        }
    };


    return (
        <>
            <center>
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tr>
                                <td style={{fontSize: "21px", fontWeight: "bold"}}>Username</td>
                                <td><input type="text" name="username" value={user.username} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontSize: "21px", fontWeight: "bold"}}>Email</td>
                                <td><input type="email" name="email" value={user.email} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td style={{fontSize: "21px", fontWeight: "bold"}}>Password</td>
                                <td><input type="password" name="password" value={user.password}
                                           onChange={handleChange}/>
                                </td>
                            </tr>
                        </table>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </center>
            {signUpStatus ? (
                <Tooaster key={signUpStatus.key} message={signUpStatus.msg} />
            ) : null}
        </>
    );
};

export default Signup;
