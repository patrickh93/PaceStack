import "./App.css";
import { useEffect, useState } from "react";

import RunForm from "./components/RunForm";
import RunList from "./components/RunList";
import {
  createRun,
  getRuns,
  updateRun,
  deleteRun,
} from "./services/runService";
import { calculateWeeklyStats } from "./utils/runStats";

import {
  formatPaceFromSeconds,
  formatDuration,
  parseDurationToSeconds,
} from "./utils/runFormatters";

const initialFormData = {
  date: "",
  distanceKm: "",
  durationSeconds: "",
  runType: "EASY",
  notes: "",
};

function App() {
  // Stores all runs loaded from the backend
  const [runs, setRuns] = useState([]);

  // Stores the current values typed into the 'Add Run' form
  const [formData, setFormData] = useState(initialFormData);

  //Stores a simple loading message while the backend request is running
  const [isLoading, setIsLoading] = useState(false);

  //Stores any error message from failed backend requests
  const [errorMessage, setErrorMessage] = useState("");

  //Stores the id of the run currently being edited
  //null means we are adding a new run, not editing
  const [editingRunId, setEditingRunId] = useState(null);

  //weekly stats variable
  const weeklyStats = calculateWeeklyStats(runs);

  /**
   * Load all runs from the Spring boot backend
   * This calls: GET http://localhost:8080/api/runs
   */
  async function loadRuns() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      //this calls the getRuns function from runService.js which recieves all runs from the database. Then update setRuns with that data (array of objects)
      const data = await getRuns();
      setRuns(data);
    } catch (error) {
      setErrorMessage("Could not load runs. Make sure backend is running");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Runs once when the App component first loads.
   * This is how the frontend loads existing runs from the backend when the page first opens
   */
  useEffect(() => {
    loadRuns();
  }, []);

  /**
   * Updates formData whenever the user types into an input, selects a run type, or writes notes
   * The inputs name decides which property to update
   */
  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  /**
   * Handles the Add Run form submission
   * This sends the form data to the backend using:
   * POST http://localhost:8080/api/runs
   */
  async function handleSubmit(e) {
    e.preventDefault();

    //format seconds input
    const parsedDurationSeconds = parseDurationToSeconds(
      formData.durationSeconds
    );

    if (parsedDurationSeconds === null) {
      setErrorMessage("Enter duration as mm:ss or hh:mm:ss.");
      return;
    }

    //convert distance strings to integers
    const runToSave = {
      ...formData,
      distanceKm: Number(formData.distanceKm),
      durationSeconds: parsedDurationSeconds,
    };

    try {
      setErrorMessage("");

      //No editing ID: calls the createRuns function from runService.js passing in the inputed form data. sends it to the backend and stores it to the database.
      //Editing ID is not null, call update run function
      if (editingRunId === null) {
        await createRun(runToSave);
      } else {
        await updateRun(editingRunId, runToSave);
      }

      //reset form to blank
      setFormData(initialFormData);

      //set editing id back to null
      setEditingRunId(null);

      //calls get runs, which gets all runs from the database to update runs state
      await loadRuns();
    } catch (error) {
      setErrorMessage("Could not save run. Check the form and backend.");
      console.error(error);
    }
  }

  /**
   * Function for editing runs
   * Puts form in edit mode, populating the form input fields with existing run values
   */
  function handleEditRun(run) {
    //set id to the run I'm editing
    //putting form into edit mode
    setEditingRunId(run.id);

    //load the runs existing values into the for inputs
    //convert numbers to strings
    setFormData({
      date: run.date,
      distanceKm: String(run.distanceKm),
      durationSeconds: formatDuration(run.durationSeconds),
      runType: run.runType,
      notes: run.notes || "",
    });
  }

  /**
   * Function for deleting runs
   * Calls the deleteRun function from the runService.js file
   */
  async function handleDeleteRun(id) {
    //show a browser confirmation popup
    const confirmed = window.confirm(
      "Are you sure you want to delete this run?"
    );

    //if user clicks cancel, return and delete nothing
    if (!confirmed) {
      return;
    }

    try {
      setErrorMessage("");
      await deleteRun(id);

      //edge case if user is editing form and then deletes that run, clear the form and exit edit mode
      if (editingRunId === id) {
        setEditingRunId(null);
        setFormData(initialFormData);
      }

      //call loadRuns() to update list of runs
      await loadRuns();
    } catch (e) {
      setErrorMessage("Could not delete run. Make sure backend is running");
      console.error(e);
    }
  }

  //Cancel edit
  function handleCancelEdit() {
    setEditingRunId(null);
    setFormData(initialFormData);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">PaceStack</div>

        <nav className="sidebar-nav">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Runs</button>
          <button className="nav-item">Summary</button>
          <button className="nav-item">Shoes</button>
          <button className="nav-item">Settings</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Track your running, review your week, and build consistency.</p>
          </div>
        </header>

        {/* display error messages if there are any */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <section className="metric-grid">
          <div className="metric-card">
            <span className="metric-label">This Week Distance</span>
            <strong>{weeklyStats.totalDistanceKm.toFixed(1)} km</strong>
          </div>

          <div className="metric-card">
            <span className="metric-label">Total Time</span>
            <strong>{formatDuration(weeklyStats.totalDurationSeconds)}</strong>
          </div>

          <div className="metric-card">
            <span className="metric-label">Runs This Week</span>
            <strong>{weeklyStats.runCount}</strong>
          </div>

          <div className="metric-card">
            <span className="metric-label">Average Pace</span>
            <strong>
              {formatPaceFromSeconds(weeklyStats.averagePaceSecondsPerKm)}
            </strong>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <h2>{editingRunId === null ? "Add Run" : "Update Run"}</h2>
            <RunForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancelEdit={handleCancelEdit}
              isEditing={editingRunId !== null}
            />
          </div>

          <div className="panel">
            <h2>Recent Runs</h2>
            {isLoading ? (
              <p>Loading runs..</p>
            ) : (
              <RunList
                runs={runs}
                onEditRun={handleEditRun}
                onDeleteRun={handleDeleteRun}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
