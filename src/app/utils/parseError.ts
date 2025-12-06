const parseError = (e: unknown, fallback = "Unknown Error") => {
  return e &&
    typeof e === "object" &&
    "message" in e &&
    typeof e.message === "string"
    ? e.message
    : fallback;
};

export default parseError;
