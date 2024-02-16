package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.service.QueueService;
import com.example.fsdproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class QueueController {

    @Autowired
    private QueueService queueService;

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

}
