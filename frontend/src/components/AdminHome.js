import React, { useState, useEffect } from 'react';
import '../styles/adminhome.css'

const AdminHome = () => {
    const [queuesWithUsers, setQueuesWithUsers] = useState([]);
    const [highLightColor,setHighLightColor] = useState({
        "queueId":null,
        "userId":null,
    });
    const [highLightedColor,setHighLightedColor] = useState({
        "queueId":null,
        "userId":null,
    });
    const [groupedQueues, setGroupedQueues] = useState({});
    const [queueNames, setQueueNames] = useState({});

    useEffect(() => {
        fetchQueuesWithUsers();
    }, []);

    useEffect(() => {
        fetchQueueNames();
    }, [queuesWithUsers]);

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
            console.log(usersData);
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
            console.log(grouped);
        } catch (error) {
            console.error('Error grouping queues with users:', error);
        }
    };

    const handleDelete = async (queueId,userId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/queues/${queueId}/${userId}/removeUser`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                setHighLightColor({ queueId, userId });
            } else {
                const errorData = await response.json();
                console.error('Error during Delete or Remove User From Queue:', errorData.error);
            }


        }
        catch (error) {
            console.error('Error during Delete or Remove User From Queue:', error.message);
        }
    }
    const handleDone = async (queueId,userId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/queues/${queueId}/${userId}/doneUserWork`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                setHighLightedColor({ queueId, userId });
            } else {
                const errorData = await response.json();
                console.error('Error during Delete or Remove User From Queue:', errorData.error);
            }
        }
        catch (error) {
            console.error('Error during Delete or Remove User From Queue:', error.message);
        }
    }

    const fetchQueueNames = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/queues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQueueNames(data);
                console.log(data);
            } else {
                throw new Error('Failed to fetch queue names');
            }
        } catch (error) {
            console.error('Error fetching queue names:', error);
        }
    };

    return (
        <div>
            {Object.entries(groupedQueues).map(([queueId, users]) => (
                <div key={queueId} className='queue-container'>
                        {queueNames[queueId-1] && (
                            <h3 style={{fontSize: "28px",color:"rgb(226, 83, 69)"}}>{queueNames[queueId-1].queueName}</h3>
                        )}

                    <center>{users.map(user => (
                        <div
                            key={user.id}
                            style={{
                                display: "flex",
                                backgroundColor: highLightColor.queueId === queueId && highLightColor.userId === user.id ? "rgba(240, 105, 96,0.4)" : highLightedColor.queueId === queueId && highLightedColor.userId === user.id ? "rgba(122, 240, 122,0.4)" : "rgba(40,15,44,0.1)"
                            }}
                            className="user-container"
                        >
                            <div style={{display: "flex",color:"white",fontSize:"19px"}}>
                                <div style={{margin: '10px'}}>Username: {user.username}</div>
                                <div style={{margin: '10px'}}>Email: {user.email}</div>
                            </div>
                            <div>
                                {(highLightColor.userId !== user.id || highLightColor.queueId !== queueId) && ((highLightedColor.queueId !== queueId || highLightedColor.userId !== user.id)) &&
                                    <button onClick={() => handleDelete(queueId, user.id)} style={{backgroundColor:"rgba(255, 0, 0,0.9)"}}>Remove</button>
                                }
                                {(highLightedColor.queueId !== queueId || highLightedColor.userId !== user.id) && (highLightColor.userId !== user.id || highLightColor.queueId !== queueId) &&
                                    <button onClick={() => handleDone(queueId, user.id)} style={{backgroundColor:"rgba(0, 190, 0,0.9)"}}>Done</button>
                                }
                            </div>
                        </div>
                    ))}</center>
                </div>
            ))}
        </div>
    );
};

export default AdminHome;
