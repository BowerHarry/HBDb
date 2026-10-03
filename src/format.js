export function releaseYear(date) {
  return date ? new Date(date).getFullYear() : '';
}

//https://plainenglish.io/blog/javascript-convert-minutes-to-hours-and-minutes
export function formatRuntime(totalMinutes) {
  if (!totalMinutes) return '';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}hr ${minutes}mins`;
}
