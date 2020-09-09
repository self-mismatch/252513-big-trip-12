import {createElement} from "../utils/render";
import {getFormatedDate} from "../utils/date";

const createRouteTemplate = (waypoints) => {
  const route = [].concat([], ...waypoints);
  let routeCities = ``;

  for (let i = 0; i < route.length; i++) {
    routeCities += route[i].destination;

    if (i !== route.length - 1) {
      routeCities += ` &mdash; `;
    }
  }

  return (
    `<h1 class="trip-info__title">${routeCities}</h1>`
  );
};

export default class Sorting {
  constructor(waypoints) {
    this._waypoints = waypoints;

    this._element = null;
  }

  _createTemplate(waypoints) {
    if (waypoints.length === 0) {
      return (
        `<section class="trip-main__trip-info  trip-info">
          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
          </p>
        </section>`
      );
    }

    const routeTemplate = createRouteTemplate(waypoints);

    const firstWaypoint = waypoints[0][0];
    const lastWaypoint = waypoints[waypoints.length - 1][waypoints[waypoints.length - 1].length - 1];

    const dateFrom = getFormatedDate(firstWaypoint.dateFrom);
    const dateTo = firstWaypoint.dateFrom.getMonth() !== lastWaypoint.dateFrom.getMonth() ? getFormatedDate(lastWaypoint.dateTo) : lastWaypoint.dateTo.getDate();

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          ${routeTemplate}

          <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>
      </section>`
    );
  }

  _getTemplate() {
    return this._createTemplate(this._waypoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


