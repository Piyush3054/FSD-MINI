package com.example.fsdproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "queue_with_users")
public class QueueWithUsers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "queue_id", nullable = false)
    private Queue queue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int position; // Position of the user in the queue

    // Add additional fields or relationships as needed

    public QueueWithUsers() {
    }

    public QueueWithUsers(Queue queue, User user) {
        this.queue = queue;
        this.user = user;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Queue getQueue() {
        return queue;
    }

    public void setQueue(Queue queue) {
        this.queue = queue;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    // Methods to manipulate position
    public void incrementPosition() {
        this.position++;
    }

    public void decrementPosition() {
        this.position--;
    }

    // Equals and hashCode methods for comparison
    // You might want to override these methods based on your requirements
}
