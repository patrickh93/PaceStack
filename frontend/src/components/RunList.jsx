import { formatDuration, formatRunType } from "../utils/runFormatters";

function RunList({ runs }) {
  if (runs.length === 0) {
    return <p className="placeholder-text">No runs saved yet</p>;
  }

  //Sort runs by date so the newest runs appear first
  //rule for sort - return negative number then put a before b and vice versa
  const sortedRuns = [...runs].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="run-list">
      <div className="run-list-header">
        <span>Date</span>
        <span>Type</span>
        <span>Distance</span>
        <span>Duration</span>
        <span>Notes</span>
      </div>

      {sortedRuns.map((run) => (
        <div className="run-list-row" key={run.id}>
          <span>{run.date}</span>
          <span>{formatRunType(run.runType)}</span>
          <span>{run.distanceKm}</span>
          <span>{formatDuration(run.durationSeconds)}</span>
          <span>{run.notes || "-"}</span>
        </div>
      ))}
    </div>
  );
}

export default RunList;
