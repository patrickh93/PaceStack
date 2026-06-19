function RunForm({
  formData,
  onInputChange,
  onSubmit,
  isEditing,
  onCancelEdit,
}) {
  return (
    <form className="run-form" onSubmit={onSubmit}>
      {/* This input shows the run date.
      React reads the value from formData.date.
      When the user changes it, the parent App updates formData.date.
      When the form submits, that date becomes part of the run object sent to the backend. */}
      <label>
        Date
        <input
          type="date"
          name="date"
          // Whatever is stored in formData.date is what appears in the input initially
          value={formData.date}
          //When the user changes the date, call the onInputChange function to update formData
          onChange={onInputChange}
          required
        />
      </label>
      <label>
        Distance (km)
        <input
          type="number"
          name="distanceKm"
          value={formData.distanceKm}
          onChange={onInputChange}
          min="0.1"
          step="0.1"
          placeholder="e.g. 8.0"
          required
        />
      </label>
      <label>
        Duration
        <input
          type="text"
          name="durationSeconds"
          value={formData.durationSeconds}
          onChange={onInputChange}
          placeholder="e.g. 38:30 or 1:12:45"
          required
        />
      </label>
      <label>
        Run Type
        <select
          name="runType"
          value={formData.runType}
          onChange={onInputChange}
          required
        >
          <option value="EASY">Easy</option>
          <option value="LONG_RUN">Long Run</option>
          <option value="WORKOUT">Workout</option>
          <option value="RACE">Race</option>
          <option value="RECOVERY">Recovery</option>
        </select>
      </label>
      <label>
        Notes
        <textarea
          name="notes"
          value={formData.notes}
          onChange={onInputChange}
          placeholder="How did it go?"
          rows="4"
        />
      </label>
      <button type="submit" className="primary-button">
        {isEditing ? "Update Run" : "Save Run"}
      </button>

      {/* Use type=button since its inside a form and default is submit */}
      {isEditing && (
        <button
          type="button"
          className="secondary-button"
          onClick={onCancelEdit}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default RunForm;
