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
              <nav style={{display:"flex",alignItems:"center"}}>
                  <h2>Queue<br />Management</h2>
                  <button onClick={()=>{setShow("1")}}>Home</button>
                  <button onClick={()=>{setShow("2")}}>QueueList</button>


              </nav>
          </div>
          {show === "1" && <Home />}
          {show === "2" && <QueueList />}
      </div>

);
}