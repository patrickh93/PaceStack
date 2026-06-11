package com.pacestack.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Simple health check endpoint used to confirm that the backend is running.
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/test")
    public String test() {
        return "Backend up and running - again!";
    }
}
