export const convertDateTimeToString = dateString => {
  const time = dateString.toLocaleTimeString();
  const date = dateString.toLocaleDateString();
  return `${date} / ${time}`;
};

export const fromatTojSDateTime = date => {
  const res = new Date(Date.parse(date));
  return res;
};

export const plusHoursToDate = (date, hours) => {
  const hoursToMs = hours * 60 * 60 * 1000;
  const mainDateToMs = Date.parse(date);

  const plusTwoHoursForFly = new Date(mainDateToMs + hoursToMs);
  // console.log(
  //   '++++plusHoursFromDate===>',
  //   date,
  //   mainDateToMs,
  //   hoursToMs,
  //   plusTwoHoursForFly
  // );

  return plusTwoHoursForFly;
};
export const minusHoursFromDate = (date, hours) => {
  const hoursToMs = hours * 60 * 60 * 1000;
  const mainDateToMs = Date.parse(date);

  const minusTwoHoursForFly = new Date(mainDateToMs - hoursToMs);
  // console.log(
  //   '++++minusHoursFromDate===>',
  //   date,
  //   mainDateToMs,
  //   hoursToMs,
  //   minusTwoHoursForFly
  // );
  return minusTwoHoursForFly;
};
