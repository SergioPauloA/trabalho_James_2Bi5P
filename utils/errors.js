export const getErrorMessage = (error, fallback) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallback;
};
