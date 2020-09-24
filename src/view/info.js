import AbstractView from "./abstract";
import {getFormatedDate} from "../utils/date";

export default class Sorting extends AbstractView {
  constructor(points) {
    super();

    this._points = points;
  }

  _createRouteTemplate(points) {
    const route = [].concat([], ...points);
    let routeCities = ``;

    if (points.length <= 3) {
      for (let i = 0; i < route.length; i++) {
        routeCities += route[i].destination;

        if (i !== route.length - 1) {
          routeCities += ` &mdash; `;
        }
      }
    } else {
      const firstPoint = route[0].destination;
      const lastPoint = route[route.length - 1].destination;

      routeCities = firstPoint + ` &mdash; ` + `...` + ` &mdash; ` + lastPoint;
    }

    return (
      `<h1 class="trip-info__title">${routeCities}</h1>`
    );
  }

  _createTemplate(points) {
    if (points.length === 0) {
      return (
        `<section class="trip-main__trip-info  trip-info">
          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
          </p>
        </section>`
      );
    }

    const routeTemplate = this._createRouteTemplate(points);

    const firstPoint = points[0][0];
    const lastPoint = points[points.length - 1][points[points.length - 1].length - 1];

    const dateFrom = getFormatedDate(firstPoint.dateFrom);
    const dateTo = firstPoint.dateFrom.getMonth() !== lastPoint.dateFrom.getMonth() ? getFormatedDate(lastPoint.dateTo) : lastPoint.dateTo.getDate();

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
    return this._createTemplate(this._points);
  }
}


