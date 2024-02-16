package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.entity.QueueWithUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QueueWithUsersRepository extends JpaRepository<QueueWithUsers, Long> {
    List<QueueWithUsers> findByQueue(Queue queue);
    Long countByQueue(Queue queue);
    void deleteByQueueAndUser(Queue queue, User user);
    List<User> findUsersByQueue(Queue queue);
}
