package com.example.fsdproject.service;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.repository.QueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueueService {

    @Autowired
    private QueueRepository queueRepository;

    public Queue findByQueueName(String queueName)
    {
        return queueRepository.findByQueueName(queueName);
    }
    public Queue findByQueueService(String queueService)
    {
        return queueRepository.findByQueueService(queueService);
    }

    public Queue saveQueue(Queue queue) {
        return queueRepository.save(queue);
    }
}
