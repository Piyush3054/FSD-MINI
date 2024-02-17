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
            <h2>Queues</h2>
            <ul style={{listStyle: "none"}}>
                {queues.map(queue => (
                    <li key={queue.queueId}>
                        <div className='list-container'>
                            <div style={{marginRight: '3vw'}}>
                                <div><strong>Name:</strong></div>
                                <div>{queue.queueName}</div>
                            </div>
                            <div style={{marginRight: '3vw'}}>
                                <div><strong>Capacity:</strong></div>
                                <div>{queue.queueCapacity}</div>
                            </div>
                            <div style={{marginRight: '3vw'}}>
                                <div><strong>Service:</strong></div>
                                <div>{queue.queueService}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}