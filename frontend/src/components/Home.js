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
            <center><h2 style={{marginLeft:"9vw",fontSize:"32px",color:"white"}}>Participated Queues</h2></center>
            <center>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    width: "80vw",
                    borderRadius: "10px",
                    padding: "20px"
                }}>
                    <table style={{width: "80vw",height:'80vh', borderCollapse: "collapse", textAlign: "center"}}>
                        <thead>
                        <tr style={{backgroundColor: "black", color: "white"}}>
                            <th style={{padding: "12px 15px", fontSize: "20px"}}>Name</th>
                            <th style={{padding: "12px 15px", fontSize: "20px"}}>Capacity</th>
                            <th style={{padding: "12px 15px", fontSize: "20px"}}>Service</th>
                            <th style={{padding: "12px 15px", fontSize: "20px"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {queues.map(queue => (
                            <tr key={queue.queueId} style={{backgroundColor: "white", color: "black"}}>
                                <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{queue.queueName}</td>
                                <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{queue.queueCapacity}</td>
                                <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{queue.queueService}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div></center>
</div>
)
    ;
}