package com.pacestack.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

/**
 * Represents a single running activity logged by the user.
 */
@Entity
public class Run {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private Double distanceKm;
    private Integer durationSeconds;
    private String runType;
    private String notes;

    public Run() {
    }

    public Run(LocalDate date, Double distanceKm, Integer durationSeconds, String runType, String notes) {
        this.date = date;
        this.distanceKm = distanceKm;
        this.durationSeconds = durationSeconds;
        this.runType = runType;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public Integer getDurationSeconds() {
        return durationSeconds;
    }

    public String getRunType() {
        return runType;
    }

    public String getNotes() {
        return notes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public void setDurationSeconds(Integer durationSeconds) {
        this.durationSeconds = durationSeconds;
    }

    public void setRunType(String runType) {
        this.runType = runType;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}