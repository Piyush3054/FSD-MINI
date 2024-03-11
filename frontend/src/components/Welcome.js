import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css';
import Home from "./Home";
import QueueList from "./QueueList";

export default function Welcome(){
    const navigate = useNavigate();
    const [show,setShow] = useState("1");

    return(
      <div>
          <div className="welcome-container">
              <nav style={{display: "flex", alignItems: "center", marginBottom: "15vh", marginTop: "7vh"}}
                   className='navbar-button'>
                  <img src="https://see.fontimg.com/api/renderfont4/MVdYB/eyJyIjoiZnMiLCJoIjozNSwidyI6MTI1MCwiZnMiOjI4LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UVVFVUUgTUFOQUdFTUVORVQ/debug-free-trial.png"/>
                  <button onClick={() => {
                      setShow("1")
                  }} style={{marginLeft:"45vw"}}>Home
                  </button>
                  <button onClick={() => {
                      setShow("2")
                  }}>QueueList
                  </button>
                  <button onClick={()=>{sessionStorage.removeItem('token');navigate("/")}}>
                      Logout
                  </button>


              </nav>
          </div>
          {show === "1" && <Home/>}
          {show === "2" && <QueueList/>}
      </div>

    );
}