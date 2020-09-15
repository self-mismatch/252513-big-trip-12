import AbstractView from "./abstract";
import {getFormatedDate, getFormatedDayFullDate} from "../utils/date";

export default class Day extends AbstractView {
  constructor(waypoints, index, isGrouped) {
    super();

    this._waypoints = waypoints;
    this._index = index;
    this._isGrouped = isGrouped;
  }

  _createTemplate(waypoints, index) {
    const dayNumber = ++index;
    const date = waypoints[0].dateFrom;
    const dayDate = getFormatedDate(date);
    const dayFullDate = getFormatedDayFullDate(date);

    if (!this._isGrouped) {
      return (
        `<li class="trip-days__item  day">
          <div class="day__info"></div>
        </li>`
      );
    }

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayNumber}</span>
          <time class="day__date" datetime="${dayFullDate}">${dayDate}</time>
        </div>
      </li>`
    );
  }

  _getTemplate() {
    return this._createTemplate(this._waypoints, this._index);
  }
}


