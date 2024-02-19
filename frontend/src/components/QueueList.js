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
            <h2>List Of Queue</h2>

        </div>
    );
}
