export function getSixMonthsAgo (): Date {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  return sixMonthsAgo;
}

export function getTowDaysAgo (): Date {
  const towDaysAgo = new Date();
  towDaysAgo.setDate(towDaysAgo.getDate() - 20);
  return towDaysAgo;
}
