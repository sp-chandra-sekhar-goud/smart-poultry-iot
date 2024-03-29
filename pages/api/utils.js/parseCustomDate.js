function parseCustomDate(dateString) {
  // Split the dateString into day, month, and year parts
  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed in JavaScript Date
  const year = parseInt(parts[2], 10);

  // Assuming the time is not provided, set time to midnight (00:00:00)
  return new Date(Date.UTC(year, month, day));
}

export default parseCustomDate;
