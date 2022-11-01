export const getNextDay  = (dayName) => {

  // The current day
  const date = new Date();
  const now = date.getDay();

  // Days of the week
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // The index for the day you want
  const day = days.indexOf(dayName.toLowerCase());

  // Find the difference between the current day and the one you want
  // If it's the same day as today (or a negative number), jump to the next week
  const diff = day - now;
  // diff = diff < 1 ? 7 + diff : diff;

  // Get the timestamp for the desired day
  const nextDayTimestamp = date.getTime() + (1000 * 60 * 60 * 24 * diff);

  // Get the next day
  return new Date(nextDayTimestamp);

}
