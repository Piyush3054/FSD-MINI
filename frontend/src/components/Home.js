import React, {useEffect, useState} from "react";
import '../styles/home.css'

export default function Home(){
    const [user,setUser] = useState([]);
    const [queues,setQueues] = useState([]);
    let userName;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const name = token.split("|");
        userName = name[0];
        fetchUserId();
    }, []);

    useEffect(() => {
        if (user.id) {
            fetchQueueInfo();
        }
    }, [user]);

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
    const fetchQueueInfo = async () => {
        try{
            const response = await fetch(`http://localhost:8080/api/queues/${user.id}/participant`,{
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch queues');
            }
            const data = await response.json();
            console.log(data);
            setQueues(data);
        }
        catch (error) {
            console.error('Error fetching queues:', error);
        }
    }
    return (
        <div className='home-container'>
            <h2>Participated Queues</h2>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                width:"50vw",
                backgroundColor: "rgba(255,255,255,0.8)"
            }}>
                <table style={{width: "50vw", height: "230px", textAlign: "center"}}>
                    <thead>
                    <tr>
                        <th style={{color: "white", fontSize: "20px"}}>NAME</th>
                        <th style={{color: "white", fontSize: "20px"}}>SIZE</th>
                        <th style={{color: "white", fontSize: "20px"}}>SERVICE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queues.map(queue => (
                        <tr key={queue.queueId}>
                            <td>{queue.queueName}</td>
                            <td>{queue.queueCapacity}</td>
                            <td>{queue.queueService}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}