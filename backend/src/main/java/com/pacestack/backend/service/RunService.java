package com.pacestack.backend.service;

import com.pacestack.backend.model.Run;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Defines the business operations available for Run records.
 */
public interface RunService {
    List<Run> getAllRuns();

    Optional<Run> getRunById(Long id);

    Run createRun(Run run);

    Optional<Run> updateRun(Long id, Run updatedRun);

    boolean deleteRun(Long id);
}
