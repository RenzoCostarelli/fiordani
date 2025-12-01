export function getValidTradingDate(date?: Date): string {
  const targetDate = date ? new Date(date) : new Date();
  const dayOfWeek = targetDate.getDay();

  // If Saturday (6), go back 1 day to Friday
  if (dayOfWeek === 6) {
    targetDate.setDate(targetDate.getDate() - 1);
  }
  // If Sunday (0), go back 2 days to Friday
  else if (dayOfWeek === 0) {
    targetDate.setDate(targetDate.getDate() - 2);
  }

  return targetDate.toISOString().split("T")[0];
}

export function getPreviousBusinessDay(dateString: string): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return getValidTradingDate(date);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
