package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.service.QueueService;
import com.example.fsdproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class QueueController {

    @Autowired
    private QueueService queueService;
    @Autowired
    private UserService userService;

    @PostMapping("/createqueue")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createQueue(@RequestBody Queue queue){
        try{
            queueService.saveQueue(queue);
            Map<String, String> response = new HashMap<>();
            response.put("data", "Queue Created Successfully");
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during Creating queue");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/queues")
    public ResponseEntity<List<Queue>> getAllQueues() {
        List<Queue> queues = queueService.getAllQueues();
        return ResponseEntity.ok(queues);
    }

    @PostMapping("/{queueId}/users")
    public ResponseEntity<?> addUserToQueue(@PathVariable Long queueId, @RequestBody User user) {
        try {
            Queue queue = queueService.findQueueById(queueId);
            if (queue == null) {
                return ResponseEntity.notFound().build();
            }
            queueService.addUserToQueue(queue, user);
            return ResponseEntity.ok("User added to queue successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding user to queue");
        }
    }

    @DeleteMapping("/{queueId}/users/admin/{userId}")
    public ResponseEntity<?> removeUserAndReorder(@PathVariable Long queueId, @PathVariable Long userId) {
        try {
            Queue queue = queueService.findQueueById(queueId);
            if (queue == null) {
                return ResponseEntity.notFound().build();
            }
            User user = userService.findUserById(userId);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            queueService.removeUserAndReorder(queue, user);
            return ResponseEntity.ok("User removed from queue and reordered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing user and reordering queue");
        }
    }

}
