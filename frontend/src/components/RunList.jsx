function RunList({ runs }) {
  if (runs.length === 0) {
    return <p className="placeholder-text">No runs saved yet</p>;
  }

  return (
    <div className="run-list">
      <div className="run-list-header">
        <span>Date</span>
        <span>Type</span>
        <span>Distance</span>
        <span>Duration</span>
        <span>Notes</span>
      </div>

      {runs.map((run) => (
        <div className="run-list-row" key={run.id}>
          <span>{run.date}</span>
          <span>{run.runType}</span>
          <span>{run.distanceKm}</span>
          <span>{run.durationSeconds}</span>
          <span>{run.notes || "-"}</span>
        </div>
      ))}
    </div>
  );
}

export default RunList;
