export const convertDateTimeToString = dateString => {
  const time = dateString.toLocaleTimeString();
  const date = dateString.toLocaleDateString();
  return `${time} / ${date}`;
};

export const fromatTojSDateTime = date => {
  const res = new Date(Date.parse(date));
  return res;
};

export const plusHoursToDate = (date, hours) => {
  const hoursToMs = hours * 60 * 60 * 1000;
  const plusTwoHoursForFly = new Date(hoursToMs + Date.parse(date));
  return plusTwoHoursForFly;
};
export const minusHoursFromDate = (date, hours) => {
  const hoursToMs = hours * 60 * 60 * 1000;
  const mainDateToMs = Date.parse(date);
  const plusTwoHoursForFly = new Date(mainDateToMs - hoursToMs);
  return plusTwoHoursForFly;
};
