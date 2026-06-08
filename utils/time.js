export const isEndTimeAfterStart = (start, end) => {
  if (!start || !end) {
    return false;
  }
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  if ([startHour, startMinute, endHour, endMinute].some(Number.isNaN)) {
    return false;
  }
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;
  return endTotal > startTotal;
};
