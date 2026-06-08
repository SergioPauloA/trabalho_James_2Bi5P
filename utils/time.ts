export const isEndTimeAfterStart = (start: string, end: string) => {
  if (!start || !end) {
    return false;
  }
  return end > start;
};
