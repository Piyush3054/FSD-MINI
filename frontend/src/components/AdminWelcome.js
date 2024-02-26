import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminwelcome.css';
import CreateQueue from "./CreateQueue";
import Home from "./Home";
import AdminHome from "./AdminHome";
import RunningQueues from "./RunningQueues";

export default function Welcome(){
    const [show,setShow] = useState("1");
    useEffect(() => {

    }, []);
    return(
        <div>
        <div className="adminWelcome-container">
            <nav style={{display:"flex",alignItems:"center",marginBottom:"15vh",marginTop:"7vh"}} className='navbar-button'>
                <button onClick={()=>{setShow("1")}}>Home</button>
                <button onClick={()=>{setShow("2")}}>CreateQueue</button>
                <button onClick={()=>{setShow("3")}}>RunningQueues</button>
            </nav>

        </div>
    {show === "1" && <AdminHome  />}
    {show === "2" && <CreateQueue />}
    {show === "3" && <RunningQueues />}</div>
    );
}