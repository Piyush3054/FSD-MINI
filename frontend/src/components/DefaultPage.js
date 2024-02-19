import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DefaultPage.css';

const DefaultPage = () => {
    return (
        <div className="main-container">
            <div className="info-container">
                <div>
                    <p style={{fontSize:"32px"}} className="inner">Welcome To Queue Management App</p>
                    <div className="inner2" style={{marginLeft:"10vw",fontSize:"18px"}}>Welcome to QueueManagement, where waiting in line becomes a thing of the past! With our <div>innovative queue management solution, you can say goodbye to long queues and hello to streamlined service.</div>QueueManagement is here to make your experience better. Say hello to shorter waits and happier customers with QueueManagement!"</div>
                </div>
            </div>
            <div className="login-page">
                <div className="choose-container">
                    <h1 style={{color: "White"}}>Queue Management</h1>
                    <p style={{color: "rgb(226, 83, 69)"}}>Streamlining Wait Times, Enhancing Efficiency – Your Queue, Our Priority!</p>
                    <div className="option" style={{marginTop: "35vh"}}>
                        <Link to="/login" style={{textDecoration: "none"}}>
                            <button>
                                <span>User Login</span>
                            </button>
                        </Link>
                    </div>

                    <div className="option">
                        <Link to="/admin" style={{textDecoration: "none", marginLeft: "5vw"}}>
                            <button>
                                <span>Admin Login</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultPage;
