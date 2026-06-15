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
