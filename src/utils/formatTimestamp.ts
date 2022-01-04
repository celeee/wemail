export const formatTimestamp = (timestamp: Date) => {
  const isoString = new Date(timestamp).toISOString();
  const arr = isoString.split("T");
  const date = arr[0];
  const time = arr[1].substring(0, arr[1].length - 8);

  return `${date} ${time}`;
};
