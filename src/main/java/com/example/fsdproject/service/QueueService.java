package com.example.fsdproject.service;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.entity.QueueWithUsers;
import com.example.fsdproject.repository.QueueRepository;
import com.example.fsdproject.repository.QueueWithUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QueueService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private QueueWithUsersRepository queueWithUsersRepository;

    @Autowired
    private UserService userService;

    public Queue saveQueue(Queue queue) {
        return queueRepository.save(queue);
    }

    public List<Queue> getAllQueues() {
        return queueRepository.findAll();
    }

    public List<Queue> getAllQueuesByUser(Long userId){
        return queueRepository.findQueuesByUserId(userId);
    }

    public Queue findQueueById(Long id) {
        return queueRepository.findById(id).orElse(null);
    }

    public void addUserToQueue(Queue queue, User user) {
        Optional<QueueWithUsers> existingAssociation = queueWithUsersRepository.findByQueueAndUser(queue, user);
        if (existingAssociation.isPresent()) {
            throw new RuntimeException("User is already in the queue");
        }
        else if (queueWithUsersRepository.countByQueue(queue) < Integer.parseInt(queue.getQueueCapacity())) {
            QueueWithUsers queueWithUsers = new QueueWithUsers(queue, user);
            queueWithUsersRepository.save(queueWithUsers);
        } else {
            throw new RuntimeException("Queue is full");
        }
    }

    public void removeUserFromQueue(Queue queue, User user) {
        queueWithUsersRepository.deleteByQueueAndUser(queue, user);
    }

    public void removeUserAndReorder(Queue queue, User user) {
        List<QueueWithUsers> queueWithUsersList = queueWithUsersRepository.findByQueue(queue);
        for (int i = 0; i < queueWithUsersList.size(); i++) {
            QueueWithUsers queueWithUsers = queueWithUsersList.get(i);
            if (queueWithUsers.getUser().equals(user)) {
                queueWithUsersRepository.delete(queueWithUsers);
                // Move users after the removed user up by one position
                for (int j = i + 1; j < queueWithUsersList.size(); j++) {
                    QueueWithUsers nextUser = queueWithUsersList.get(j);
                    nextUser.setPosition(nextUser.getPosition() - 1);
                    queueWithUsersRepository.save(nextUser);
                }
                break;
            }
        }
    }

}
