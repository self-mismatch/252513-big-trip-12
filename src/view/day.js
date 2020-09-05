import {createWaypointsTemplate} from "./waypoints";
import {getFormatedDate, getFormatedDayFullDate} from "../utils/date";

export const createDayTemplate = (waypoints, index) => {
  const dayNumber = ++index;
  const date = waypoints[0].dateFrom;
  const dayDate = getFormatedDate(date);
  const dayFullDate = getFormatedDayFullDate(date);

  const waypointsTemplate = createWaypointsTemplate(waypoints, index);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${dayFullDate}">${dayDate}</time>
      </div>
      <ul class="trip-events__list">${waypointsTemplate}</ul>
    </li>`
  );
};
