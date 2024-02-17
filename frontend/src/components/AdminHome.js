import React, { useState, useEffect } from 'react';

const AdminHome = () => {
    const [queuesWithUsers, setQueuesWithUsers] = useState([]);

    useEffect(() => {
        fetchQueuesWithUsers();
    }, []);

    const fetchQueuesWithUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/queues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQueuesWithUsers(data);
            } else {
                throw new Error('Failed to fetch queues with users');
            }
        } catch (error) {
            console.error('Error fetching queues with users:', error);
        }
    };

    return (
        <div>
            <h2>Queues with Assigned Users</h2>
            {queuesWithUsers.map(queue => (
                <div key={queue.id}>
                    <h3>{queue.queue.queueName}</h3>
                    <p>Users: {queue.user.map(user => user.username).join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default AdminHome;
