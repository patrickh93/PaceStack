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
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
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

/**
 * Calcules and formats average pace as minutes per kilometer
 * Example:
 * distanceKm = 8
 * durationSeconds = 2310
 *
 * 2310 / 8 = 288.75 seconds per km
 * 288.75 seconds = 4:49 /km
 */
export function formatPace(distanceKm, durationSeconds) {
  const distance = Number(distanceKm);
  const duration = Number(durationSeconds);

  //check that distance and duration are valid numbers, otherwise return "--:--"
  if (
    !Number.isFinite(distance) ||
    !Number.isFinite(duration) ||
    distance <= 0 ||
    duration <= 0
  ) {
    return "--:--/km";
  }

  //calculates pace (rounded)
  const paceSecondsPerKm = Math.round(duration / distance);

  const minutes = Math.floor(paceSecondsPerKm / 60);
  const seconds = paceSecondsPerKm % 60;

  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${minutes}:${paddedSeconds}/km`;
}

/**
 * Formats a pace value that is already in seconds per km
 * Example:
 * 289 -> "4:49/km"
 */
export function formatPaceFromSeconds(paceSecondsPerKm) {
  //convert to number
  const pace = Number(paceSecondsPerKm);

  //check number is valid
  if (!Number.isFinite(pace) || pace <= 0) {
    return "--:--/km";
  }

  //round pace to nearest integer
  const roundedPace = Math.round(pace);

  //get minutes and seconds
  const minutes = Math.floor(roundedPace / 60);
  const seconds = roundedPace % 60;

  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${minutes}:${paddedSeconds} /km`;
}
