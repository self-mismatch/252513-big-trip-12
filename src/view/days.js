import {createDayTemplate} from "./day";

export const createDaysTemplate = (waypoints) => {
  let daysTemplate = ``;

  waypoints.forEach((oneDayWaypoints, index) => {
    daysTemplate += createDayTemplate(oneDayWaypoints, index);
  });

  return (
    `<ul class="trip-days">${daysTemplate}</ul>`
  );
};
