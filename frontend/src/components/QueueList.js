import React, { useState, useEffect } from "react";
import '../styles/queuelist.css';

export default function QueueList() {
    const [queues, setQueues] = useState([]);

    useEffect(() => {
        fetchQueues();
    }, []);

    const fetchQueues = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/queues');
            if (!response.ok) {
                throw new Error('Failed to fetch queues');
            }
            const data = await response.json();
            setQueues(data);
        } catch (error) {
            console.error('Error fetching queues:', error);
        }
    };

    return (
        <div className='queuelist-container'>
            <h2>Queue List</h2>
            <ul>
                {queues.map(queue => (
                    <li key={queue.queueId}>
                        <div>
                            <strong>Name:</strong> {queue.queueName}
                        </div>
                        <div>
                            <strong>Capacity:</strong> {queue.queueCapacity}
                        </div>
                        <div>
                            <strong>Service:</strong> {queue.queueService}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
