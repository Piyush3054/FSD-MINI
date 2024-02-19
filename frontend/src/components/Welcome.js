import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css';
import Home from "./Home";
import QueueList from "./QueueList";

export default function Welcome(){
    const [show,setShow] = useState("1");

    return(
      <div>
          <div className="welcome-container">
              <nav style={{display:"flex",alignItems:"center",marginBottom:"15vh",marginTop:"7vh"}} className='navbar-button'>
                  <button onClick={()=>{setShow("1")}}>Home</button>
                  <button onClick={()=>{setShow("2")}}>QueueList</button>


              </nav>
          </div>
          {show === "1" && <Home />}
          {show === "2" && <QueueList />}
      </div>

);
}