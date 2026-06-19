package com.pacestack.backend.controller;

import com.pacestack.backend.model.Run;
import com.pacestack.backend.service.RunService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing running activity records.
 *
 * This class handles HTTP requests from the frontend and delegates
 * business logic to the RunService.
 */
@RestController
@RequestMapping("/api/runs")
@CrossOrigin(origins = "http://localhost:5183")
public class RunController {

    private final RunService runService;

    public RunController(RunService runService) {
        this.runService = runService;
    }

    /**
     * Gets all saved runs.
     *
     * Example:
     * GET /api/runs
     */
    @GetMapping
    public List<Run> getAllRuns() {
        return runService.getAllRuns();
    }

    /**
     * Creates a new run.
     *
     * Example:
     * POST /api/runs
     */
    @PostMapping
    public Run createRun(@RequestBody Run run) {
        return runService.createRun(run);
    }

    /**
     * Updates an existing run.
     *
     * Example:
     * PUT /api/runs/1
     *
     * ResponseEntity is used to return an HTTP response.
     * If the run exists, return 200 OK with the updated run.
     * If the run does not exist, return 404 Not Found.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Run> updateRun(@PathVariable Long id, @RequestBody Run updatedRun) {
        return runService.updateRun(id, updatedRun)
                // If the service returns a Run, wrap it in a 200 OK response
                .map(ResponseEntity::ok)
                // If the service returns Optional.empty(), return 404 Not Found
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Deletes a run by its ID.
     *
     * Example:
     * DELETE /api/runs/1
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRun(@PathVariable Long id) {
        // Ask the service to delete the run.
        // The service returns true if it deleted something, false if the ID was not found.
        boolean deleted = runService.deleteRun(id);

        // If no run existed with this ID, return 404 Not Found.
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        // Delete worked. Return 204 No Content because there is no body to send back.
        return ResponseEntity.noContent().build();
    }
}
