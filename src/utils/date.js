import moment from "moment";

const getFormatedDate = (date) => {
  return moment(date).format(`MMM D`);
};

const getFormatedDayFullDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

const formatTime = (date, datePostfix) => {
  return date ? date + datePostfix : ``;
};

const getFormatedPointTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const getFormatedPointDate = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH:mm`);
};

const getPointDuration = (dateFrom, dateTo) => {
  const {days, hours, minutes} = moment.duration(moment(dateTo).diff(dateFrom))._data;

  return `${formatTime(days, `D`)} ${formatTime(hours, `H`)} ${formatTime(minutes, `M`)}`;
};

const getFormatedPointEditDate = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export {getFormatedDate, getFormatedDayFullDate, getFormatedPointTime, getFormatedPointDate, getPointDuration, getFormatedPointEditDate};
