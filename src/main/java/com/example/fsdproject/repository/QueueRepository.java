package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QueueRepository extends JpaRepository<Queue,Long> {

    Queue findByQueueName(String queueName);

    Queue findByQueueService(String queueService);
}
