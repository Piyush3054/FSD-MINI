import React, { useState, useEffect } from 'react';
import '../styles/AdminHome.css'; // Import CSS file for styling

const AdminHome = () => {
    const [queuesWithUsers, setQueuesWithUsers] = useState([]);
    const [groupedQueues, setGroupedQueues] = useState({}); // Initialize as state

    useEffect(() => {
        fetchQueuesWithUsers();
    }, []);

    const fetchQueuesWithUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/abed/admin/queues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQueuesWithUsers(data);
                groupQueuesWithUsers(data); // Call group function here
            } else {
                throw new Error('Failed to fetch queues with users');
            }
        } catch (error) {
            console.error('Error fetching queues with users:', error);
        }
    };

    const groupQueuesWithUsers = async (queuesWithUsers) => {
        try {
            const userIds = queuesWithUsers.map(queueWithUser => queueWithUser.user);
            const usersData = await Promise.all(userIds.map(async userId => {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/getData/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        return { id: userId, username: userData.username, email: userData.email };
                    } else {
                        throw new Error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            }));

            const grouped = {};
            queuesWithUsers.forEach(queueWithUser => {
                const queueId = queueWithUser.queue;
                const userId = queueWithUser.user;
                if (!grouped[queueId]) {
                    grouped[queueId] = [];
                }
                const userData = usersData.find(user => user && user.id === userId); // Find corresponding user data
                if (userData) {
                    grouped[queueId].push(userData);
                }
            });
            setGroupedQueues(grouped);
        } catch (error) {
            console.error('Error grouping queues with users:', error);
        }
    };

    return (
        <div>
            <h2>Queues with Assigned Users</h2>
            {Object.entries(groupedQueues).map(([queueId, users]) => (
                <div key={queueId}>
                    <h3>Queue-{queueId}</h3>
                    {users.map(user => (
                        <div key={user.id}>
                            <div className="user-details">
                                <div>username: {user.username}</div>
                                <div>email: {user.email}</div>
                            </div>
                            <button>Remove</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

};

export default AdminHome;
