/**
 * Converts duration in seconds into a readable mm:ss format
 * Examples:
 * 2310 -> "38:30"
 * 3665 -> "1:01:05"
 */
export function formatDuration(durationSeconds) {
  //convert string input to a number
  const totalSeconds = Number(durationSeconds);

  //check that its a valid number, otherwise return "--:--"
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "--:--";
  }

  //break total seconds into hours, minutes and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  //Show seconds as two digits so "5" becomes "05" etc.
  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours > 0) {
    //Show minutes as two digits so "5" becomes "05" etc.
    const paddedMinutes = String(minutes).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

/**
 * Converts backend run type values into nicer display labels
 * Examples:
 * EASY -> Easy
 * LONG_RUN -> Long Run
 */
export function formatRunType(runType) {
  const labels = {
    EASY: "Easy",
    LONG_RUN: "Long Run",
    WORKOUT: "Workout",
    RACE: "Race",
    RECOVERY: "Recovery",
  };

  //Look inside the labels object using the runType value.
  // If a matching label exists, return it.
  // If no matching label exists, just return the original runType.
  return labels[runType] || runType;
}
