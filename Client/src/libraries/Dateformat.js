export const Dateformat = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    minute: 'numeric',  // Corrected closing bracket for this object
  });
};
