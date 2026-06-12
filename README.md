# PaceStack

PaceStack is a full-stack running log application built with React, Spring Boot and a relational database.

The goal of the app is to let runners record training runs, view their running history, and later analyse useful training data such as pace,
weekly distance, run types and shoe mileage.

## Tech Stack

- React
- Java
- Spring Boot
- REST API
- Relational database
- Git and GitHub

## Current Version

v0.3.0 - Backend Run CRUD API

## Project Structure

pacestack/
backend/
frontend/
README.md
.gitignore

## Planned Features

-Add, view, update and delete runs
-Calculate running pace
-View weekly training summaries
-Filter runs by type and date
-Track shoe mileage

## Status

Initial project setup in progress.

## Backend API Endpoints

### Health Check

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| GET    | `/api/health` | Confirms the backend is running |

### Runs

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/api/runs`      | Get all runs           |
| GET    | `/api/runs/{id}` | Get one run by ID      |
| POST   | `/api/runs`      | Create a new run       |
| PUT    | `/api/runs/{id}` | Update an existing run |
| DELETE | `/api/runs/{id}` | Delete a run           |
