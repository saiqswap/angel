export const formatNftName = (string) => {
  return string.toLowerCase().replace(/\s/g, "_").replace(/-/g, "_");
};

export const _formatNameToLink = (string) => {
  return string
    .toLowerCase()
    .replace("'", "")
    .replace(/\s/g, "_")
    .replace(/-/g, "_");
};
