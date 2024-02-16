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
        e.preventDefault();

        try{
            const res = await fetch('http://localhost:8080/api/createqueue',{
                method : 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data),
            });
        }
        catch (error) {
            // Handle network errors or other exceptions
            console.error('Error during :', error.message);
        }
    }
    return (
        <div className='createqueue-container'>
            <h1>Queue Name</h1>
            <input type="text" name="queueName" value={data.QueueName} onChange={handleChange}/>
            <h1>Queue Size</h1>
            <input type="Number" name="queueCapacity" value={data.QueueCapacity} onChange={handleChange}/>
            <h1>Service Type</h1>
            <input type="text" name="queueService" value={data.QueueService} onChange={handleChange}/>
            <button></button>
        </div>
    );
}