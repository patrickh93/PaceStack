package com.pacestack.backend.service;

import com.pacestack.backend.model.Run;
import com.pacestack.backend.repository.RunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RunServiceImpl implements RunService{

    private final RunRepository runRepository;


    @Autowired
    public RunServiceImpl(RunRepository runRepository) {
        this.runRepository = runRepository;
    }

    @Override
    public List<Run> getAllRuns() {
        return runRepository.findAll();
    }

    @Override
    public Optional<Run> getRunById(Long id) {
        return runRepository.findById(id);
    }

    @Override
    public Run createRun(Run run) {
        return runRepository.save(run);
    }

    /**
     * Updates an existing Run record.
     *
     * The ID comes from the URL path, for example: PUT /api/runs/3.
     * We first search the database for an existing Run with that ID.
     *
     * If the Run exists:
     * - copy the new values from updatedRun onto the existing database object
     * - keep the original ID
     * - save the existing object again
     * - return the updated Run inside an Optional
     *
     * If the Run does not exist:
     * - the map block is skipped
     * - Optional.empty() is returned
     *
     * Returning Optional<Run> lets the controller decide whether to return:
     * - 200 OK with the updated Run
     * - 404 Not Found if no Run exists with that ID
     */
    @Override
    public Optional<Run> updateRun(Long id, Run updatedRun) {
        return runRepository.findById(id)
                .map(existingRun -> {
                    existingRun.setDate(updatedRun.getDate());
                    existingRun.setDistanceKm(updatedRun.getDistanceKm());
                    existingRun.setDurationSeconds(updatedRun.getDurationSeconds());
                    existingRun.setRunType(updatedRun.getRunType());
                    existingRun.setNotes(updatedRun.getNotes());

                    return runRepository.save(existingRun);
                });
    }

    @Override
    public boolean deleteRun(Long id) {
        //if the run with that id doesn't exist, return false, else delete the run
        //existsById(id) built in jpa method
        //Spring Data JPA runs a database check behind the scenes, basically asking:
        //Does a row exist in the run table with this ID?
        if (!runRepository.existsById(id)) {
            return false;
        }

        runRepository.deleteById(id);
        return true;
    }
}
