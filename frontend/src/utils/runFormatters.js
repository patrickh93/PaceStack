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

/**
 * Converts a duration string into total seconds
 * Acceped formats:
 * "38:30" -> 2310 seconds
 * Returns null if the input is invalid
 */
export function parseDurationToSeconds(durationText) {
  //check for empty input
  if (!durationText) {
    return null;
  }

  //split the text by colons (puts them into an array eg "38:30" -> ["38", "30"]) and remove extra white space
  const parts = durationText.split(":").map((part) => part.trim());

  //check that the format has 2 or 3 parts
  //only accept formats mm:ss / hh:mm:ss
  if (parts.length < 2 || parts.length > 3) {
    return null;
  }

  //convert strings to numbers
  const numbers = parts.map((part) => Number(part));

  //check if there is any invalid numbers
  const hasInvalidNumber = numbers.some((number) => {
    return !Number.isInteger(number) || number < 0;
  });

  //return null if any number is invald
  if (hasInvalidNumber) {
    return null;
  }

  //Handle the mm:ss format
  if (parts.length === 2) {
    const [minutes, seconds] = numbers;

    if (seconds >= 60) {
      return null;
    }

    return minutes * 60 + seconds;
  }

  //Handle the hh:mm:ss format
  const [hours, minutes, seconds] = numbers;

  if (minutes >= 60 || seconds >= 60) {
    return null;
  }

  return hours * 3600 + minutes * 60 + seconds;
}
