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
        <div className='createqueue-container'>
            <form onSubmit={handleQueueData}>
                <h1>Queue Name</h1>
                <input type="text" name="queueName" value={data.queueName} onChange={handleChange}/>
                <h1>Queue Size</h1>
                <input type="Number" name="queueCapacity" value={data.queueCapacity} onChange={handleChange}/>
                <h1>Service Type</h1>
                <input type="text" name="queueService" value={data.queueService} onChange={handleChange}/>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}