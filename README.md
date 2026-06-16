# PaceStack

PaceStack is a full-stack running log application built with React, Spring Boot and a relational database.

The goal of the app is to let runners record training runs, view their running history, and later analyse useful training data such as pace,
weekly distance, run types and shoe mileage.

## System Design / Architecture

PaceStack is a full-stack running log app built with React, Spring Boot and MySQL. The frontend is responsible for the user interface and sends JSON requests to a REST API. The backend follows a layered architecture with controllers for HTTP endpoints, services for business logic, repositories for database access, and JPA/Hibernate for mapping Java entities to MySQL tables. For example, when a user adds a run, React sends a POST request to /api/runs, the controller passes the request to the service, the service uses the repository to save the run, Hibernate writes it to MySQL, and the saved run is returned to the frontend as JSON.

## Tech Stack

- React
- Java
- Spring Boot
- REST API
- Relational database
- Git and GitHub

## Current Version

v0.7.0 - Frontend edit and delete runs 

## Version History

-v0.1.0 - Initial project structure
-v0.2.0 - Spring Boot backend setup
-v0.3.0 - Backend Run CRUD API
-v0.4.0 - React frontend foundation
-v0.5.0 - Frontend Add Run form connected to backend API
-v0.6.0 - Improved run display formatting
-v0.7.0 - Frontend edit and delete runs

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
-AI API to comment on runs

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

## Frontend

The frontend is a React app built with Vite.

Current frontend features:
-PaceStack dashboard shell
-Dark sidebar navigation
-Dashboard metric cards
-Add Run form
-API service layer for backend requests
-Loads runs from the Spring Boot backend
-Saves new runs to the MySql database through the backend API
-Formats run duration from seconds into a readable time
-Formats backend run type values into user friendly labels
-Sort recent runs newest first
-Edit exiting runs from the dashboard
-Delete runs from the dashboard
-Reuses the Add Run form for editing
-Confirms before deleting a run

### Run the Frontend

```bash
npm install
npm run dev


