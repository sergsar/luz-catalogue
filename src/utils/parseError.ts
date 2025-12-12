const parseError = (
  e: unknown,
  { maxLength = 200, fallback = "Unknown Error" } = {},
) => {
  console.log({ maxLength });
  return e &&
    typeof e === "object" &&
    "message" in e &&
    typeof e.message === "string"
    ? e.message.slice(0, maxLength).padEnd(3, "...")
    : fallback;
};

export default parseError;
