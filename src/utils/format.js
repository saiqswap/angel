export const formatNftName = (string) => {
  return string.toLowerCase().replace(/\s/g, "_").replace(/-/g, "_");
};
