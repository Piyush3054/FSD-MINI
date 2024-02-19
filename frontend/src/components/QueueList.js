import React, { useState, useEffect } from "react";
import '../styles/queuelist.css';

export default function QueueList() {
    const [user,setUser] = useState([]);
    const [queues, setQueues] = useState([]);
    let userName;

    useEffect(() => {
        fetchQueues();
        const token = sessionStorage.getItem('token');
        const name = token.split("|");
        userName = name[0];
        fetchUserId();
    }, []);

    const fetchQueues = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/queues');
            if (!response.ok) {
                throw new Error('Failed to fetch queues');
            }
            const data = await response.json();
            console.log(data);
            setQueues(data);
        } catch (error) {
            console.error('Error fetching queues:', error);
        }
    };
    const fetchUserId = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/getuser/${userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setUser(responseData);
            } else {
                throw new Error("User Not Found");
            }

        } catch (error) {
            console.error('Error during Fetch user:', error.message);
        }
    };

    const handleParticipant = async (queueId) => {
            try{
                const response = await fetch(`http://localhost:8080/api/queues/${queueId}/${user.id}/adduser`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data);

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.data);
                } else {
                    const errorData = await response.json();
                    console.error('Error during Adding user to queue:', errorData.error);
                }
            }
            catch (error) {
                console.error('Error during Adding user to queue:', error.message);
            }
    };

    return (
        <div className='queuelist-container'>
            <center><h2 style={{fontSize:"32px",color:"rgb(226, 83, 69)"}}>List Of Queue</h2></center>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <table style={{
                    width: "70%",
                    borderCollapse: "collapse",
                    backgroundColor: "rgb(54, 39, 94)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}>
                    <thead>
                    <tr style={{backgroundColor: "rgb(54, 39, 94)", color: "white"}}>
                        <th style={{padding: "12px 15px"}}>Name</th>
                        <th style={{padding: "12px 15px"}}>Capacity</th>
                        <th style={{padding: "12px 15px"}}>Service</th>
                        <th style={{padding: "12px 15px"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queues.map(queue => (
                        <tr key={queue.queueId} style={{backgroundColor: "white", color: "rgb(54, 39, 94)"}}>
                            <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{queue.queueName}</td>
                            <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{queue.queueCapacity}</td>
                            <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{queue.queueService}</td>
                            <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>
                                <button style={{
                                    backgroundColor: "rgb(226, 83, 69)",
                                    color: "white",
                                    border: "none",
                                    padding: "8px 12px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }} onClick={() => handleParticipant(queue.queueId)}>Participate
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}
