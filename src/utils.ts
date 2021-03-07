export const formattedDateString = (d: Date) => {
  const date = new Date(d);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
