import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DefaultPage.css';

const DefaultPage = () => {
    return (
        <div className="main-container">
            <center>
                <div className="inner-container">
                    <div className="info-container">
                        <div>
                            <div className="inner2" style={{marginLeft: "7vw", fontSize: "24px"}}>
                                <div style={{color: "black"}}>Welcome to QueueManagement,</div>
                                <div style={{fontFamily: "Brush Script MT, cursive", fontWeight: "bold"}}>where waiting
                                    in
                                    line becomes a thing of the past! With our innovative queue management solution, you
                                    can
                                    say goodbye to long queues and hello to streamlined service.QueueManagement is here
                                    to
                                    make your experience better. Say hello to shorter waits and happier customers with
                                    QueueManagement!"
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-page">
                        <div className="choose-container">
                            <h1>Queue Management</h1>
                            <p style={{color: "rgb(226, 83, 69)"}}>Streamlining Wait Times, Enhancing Efficiency – Your
                                Queue, Our Priority!</p>
                            <div className="option" style={{marginTop: "22vh"}}>
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
            </center>
        </div>
    );
};

export default DefaultPage;
