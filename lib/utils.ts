export function getValidTradingDate(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // If Saturday (6), go back 1 day to Friday
  if (dayOfWeek === 6) {
    today.setDate(today.getDate() - 1);
  }
  // If Sunday (0), go back 2 days to Friday
  else if (dayOfWeek === 0) {
    today.setDate(today.getDate() - 2);
  }

  return today.toISOString().split("T")[0];
}
