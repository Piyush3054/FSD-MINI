import React, {useEffect, useState} from 'react';
import '../styles/queuelist.css'
import Toaster from "./Toaster";

function RunningQueues(props) {
    const [queues, setQueues] = useState([]);
    const [runningQueueStatus,setRunningQueueStatus] = useState("");

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
            console.log(data);
            setQueues(data);
        } catch (error) {
            console.error('Error fetching queues:', error);
        }
    };

    const handleRemove = async (queueId) => {
      try{
          const res = await fetch(`http://localhost:8080/api/queues/${queueId}/removeQueue`,{
              method : "POST",
              headers : {
                    'Content-Type':'application/json',
              },
          });

          if(res.ok){
              const resData = await res.json();
              console.log(resData);
              setRunningQueueStatus({msg:"Queue deleted successfully",key:Math.random()});
          }
          else{
              const errorData = await res.json();
              console.error('Error during Deleting queue:', errorData.error);
              setRunningQueueStatus({msg:"Queue was not deleted",key:Math.random()});
          }
      }
      catch(error) {
          console.error('Error during Deleting queue:', error.message);
      }
    };

    return (
        <>
            <div className='queuelist-container'>
                <center><h2 style={{fontSize: "32px", color: "white"}}>List Of Queue</h2></center>
                <center>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        padding: "20px"
                    }}>
                        <table style={{width: "80vw", borderCollapse: "collapse", textAlign: "center"}}>
                            <thead>
                            <tr style={{backgroundColor: "black", color: "white"}}>
                                <th style={{padding: "12px 15px"}}>Name</th>
                                <th style={{padding: "12px 15px"}}>Capacity</th>
                                <th style={{padding: "12px 15px"}}>Service</th>
                                <th style={{padding: "12px 15px"}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {queues.map(queue => (
                                <tr key={queue.queueId} style={{backgroundColor: "white", color: "black"}}>
                                    <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{queue.queueName}</td>
                                    <td style={{
                                        padding: "12px 15px",
                                        border: "1px solid #ddd"
                                    }}>{queue.queueCapacity}</td>
                                    <td style={{
                                        padding: "12px 15px",
                                        border: "1px solid #ddd"
                                    }}>{queue.queueService}</td>
                                    <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>
                                        <button style={{
                                            backgroundColor: "rgb(226, 83, 69)",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }} onClick={() => handleRemove(queue.queueId)}>RemoveQueue
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </center>


            </div>
            {runningQueueStatus ? (
                <Toaster key={runningQueueStatus.key} message={runningQueueStatus.msg}/>
            ) : null}
        </>
    );
}

export default RunningQueues;