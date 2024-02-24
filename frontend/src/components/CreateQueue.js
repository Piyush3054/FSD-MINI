import React, {useState} from "react";
import '../styles/createqueue.css'

export default function CreateQueue(){
    const QueueInfo = {
        queueName : "",
        queueCapacity : "",
        queueService : "",
    }
    const [data,setData] = useState(QueueInfo);
    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value});
    };
    const handleQueueData = async (e) => {

        try{
            const res = await fetch('http://localhost:8080/api/createqueue',{
                method : 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data),
            });
            if (res.ok) {
                // Handle success
                const responseData = await res.json();
                console.log(responseData.data);
            }
        }
        catch (error) {
            // Handle network errors or other exceptions
            console.error('Error during :', error.message);
        }
    };
    return (
        <center>
            <div className='createqueue-container' style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                width:"fit-content",
            }}>
                <form onSubmit={handleQueueData}>
                    <h1 style={{fontSize:"32px"}}>Create Queue</h1>
                    <table>
                        <tr>
                            <td style={{color: 'black',fontSize:"22px",fontWeight:"bold"}}>Queue Name</td>
                            <td><input type="text" name="queueName" value={data.queueName} onChange={handleChange}
                                       style={{
                                           marginBottom: '10px',
                                           padding: '8px',
                                           borderRadius: '5px',
                                       }}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{color: 'black',fontSize:"22px",fontWeight:"bold"}}>Queue Size</td>
                            <td><input type="Number" name="queueCapacity" value={data.queueCapacity}
                                       onChange={handleChange}
                                       style={{
                                           marginBottom: '10px',
                                           padding: '8px',
                                           borderRadius: '5px',
                                       }}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{color: 'black',fontSize:"22px",fontWeight:"bold"}}>Queue Service</td>
                            <td><input type="text" name="queueService" value={data.queueService} onChange={handleChange}
                                       style={{
                                           marginBottom: '10px',
                                           padding: '8px',
                                           borderRadius: '5px',
                                       }}/>
                            </td>
                        </tr>
                    </table>
                    <button type="submit" style={{
                        backgroundColor: 'rgb(226, 83, 69)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer'
                    }}>Create
                    </button>

                </form>
            </div>
        </center>

    );
}