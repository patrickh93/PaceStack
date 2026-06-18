/**
 * Returns true if the run date is within the current calendar week
 * This uses Monday as the start of the week
 */
function isRunThisWeek(runDate) {
  //Get todays date
  const today = new Date();
  //Get the runs date
  const date = new Date(runDate);

  //Get current day (returns a number where 0 is sunday )
  const dayOfWeek = today.getDay();
  //Calculate how many days since Monday
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  //Find Monday morning
  //Make copy of todays date
  const startOfWeek = new Date(today);
  //Move copied date backwards to Monday
  startOfWeek.setDate(today.getDate() - daysSinceMonday);
  //Set time to midnight
  startOfWeek.setHours(0, 0, 0, 0);

  //Find next Monday
  //Make copy of startOfWeek
  const endOfWeek = new Date(startOfWeek);
  //Take the day of the month from endOfWeek and add 7 to get next Monday
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  //Check if the run is inside that range (returns true or false)
  return date >= startOfWeek && date < endOfWeek;
}

/**
 * Calculate dashboard stats for runs completed this week
 * Recieves one argument which is the array of run objects
 */
export function calculateWeeklyStats(runs) {
  //Takes the runs array and filters it down to only this weeks runs
  const runsThisWeek = runs.filter((run) => isRunThisWeek(run.date));

  //Calculate the total distance from the runs this week
  const totalDistanceKm = runsThisWeek.reduce((total, run) => {
    return total + Number(run.distanceKm);
  }, 0);

  //Calculate number of runs from runs this week
  const runCount = runsThisWeek.length;

  //Calculate the total duration in seconds from runs this week
  const totalDurationSeconds = runsThisWeek.reduce((total, run) => {
    return total + Number(run.durationSeconds);
  }, 0);

  //Calculate the average pace per km from the runs this week (seconds per km)
  const averagePaceSecondsPerKm =
    totalDistanceKm > 0 ? totalDurationSeconds / totalDistanceKm : null;

  //return an object with all the stats needed for the dashboard

  //   return {
  //     totalDistanceKm: totalDistanceKm,
  //     totalDurationSeconds: totalDurationSeconds,
  //     runCount: runCount,
  //     averagePaceSecondsPerKm: averagePaceSecondsPerKm,
  //   };

  //shorthand way
  return {
    totalDistanceKm,
    totalDurationSeconds,
    runCount,
    averagePaceSecondsPerKm,
  };
}
