import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminwelcome.css';
import CreateQueue from "./CreateQueue";
import Home from "./Home";
import AdminHome from "./AdminHome";
import RunningQueues from "./RunningQueues";

export default function Welcome(){
    const navigate = useNavigate();
    const [show,setShow] = useState("1");
    useEffect(() => {

    }, []);
    return(
        <div>
        <div className="adminWelcome-container">
            <nav style={{display: "flex", alignItems: "center", marginBottom: "15vh", marginTop: "7vh"}}
                 className='navbar-button'>
                <img
                    src="https://see.fontimg.com/api/renderfont4/MVdYB/eyJyIjoiZnMiLCJoIjozNSwidyI6MTI1MCwiZnMiOjI4LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UVVFVUUgTUFOQUdFTUVORVQ/debug-free-trial.png"/>
                <button onClick={() => {
                    setShow("1")
                }} style={{marginLeft: "32vw"}}>Home
                </button>
                <button onClick={() => {
                    setShow("2")
                }}>CreateQueue
                </button>
                <button onClick={() => {
                    setShow("3")
                }}>RunningQueues
                </button>
                <button onClick={() => {
                    sessionStorage.removeItem('token');
                    navigate("/")
                }}>
                    Logout
                </button>
            </nav>

        </div>
            {show === "1" && <AdminHome/>}
            {show === "2" && <CreateQueue/>}
            {show === "3" && <RunningQueues/>}</div>
    );
}