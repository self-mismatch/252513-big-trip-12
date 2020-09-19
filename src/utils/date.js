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

const getFormatedWaypointTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const getFormatedWaypointDate = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH:mm`);
};

const getWaypointDuration = (dateFrom, dateTo) => {
  const {days, hours, minutes} = moment.duration(moment(dateTo).diff(dateFrom))._data;

  return `${formatTime(days, `D`)} ${formatTime(hours, `H`)} ${formatTime(minutes, `M`)}`;
};

const getFormatedWaypointEditDate = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export {getFormatedDate, getFormatedDayFullDate, getFormatedWaypointTime, getFormatedWaypointDate, getWaypointDuration, getFormatedWaypointEditDate};
