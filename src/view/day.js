import AbstractView from "./abstract";
import {getFormatedDate, getFormatedDayFullDate} from "../utils/date";

export default class Day extends AbstractView {
  constructor(points, index, isGrouped) {
    super();

    this._points = points;
    this._index = index;
    this._isGrouped = isGrouped;
  }

  _createTemplate(points, index) {
    const dayNumber = ++index;
    const date = points[0].dateFrom;
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
    return this._createTemplate(this._points, this._index);
  }
}


