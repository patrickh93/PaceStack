const API_BASE_URL = "http://localhost:8080/api/runs";

/**
 * Get all runs from the spring boot backend (database)
 */

export async function getRuns() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch runs");
  }

  return response.json();
}
/**
 * Send a new run to the spring boot backend (database)
 */
export async function createRun(run) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(run),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch runs");
  }

  return response.json();
}

/**
 * Updates an existing run in the Spring Boot backend
 */
export async function updateRun(id, run) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(run),
  });

  if (!response.ok) {
    throw new Error("Failed to update run");
  }

  return response.json();
}

/**
 * Deletes a run from the Spring Boot backend
 */
export async function deleteRun(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete run");
  }
}
