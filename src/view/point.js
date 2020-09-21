import AbstractView from "./abstract";
import {getFormatedPointTime, getFormatedPointDate, getPointDuration} from "../utils/date";

export default class Point extends AbstractView {
  constructor(point) {
    super();

    this._point = point;

    this._editOpenClickHandler = this._editOpenClickHandler.bind(this);
  }

  _createOffersTemplate(offers) {
    let template = ``;

    offers.forEach((offer) => {
      template += `<li class="event__offer">
        <span class="event__offer-title">${offer.fullName}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`;
    });

    return template;
  }

  _createTemplate(point) {
    const {basePrice, dateFrom, dateTo, destination, offers, type} = point;

    const startDate = getFormatedPointDate(dateFrom);
    const endDate = getFormatedPointDate(dateTo);
    const startTime = getFormatedPointTime(dateFrom);
    const endTime = getFormatedPointTime(dateTo);

    const duration = getPointDuration(dateFrom, dateTo);

    const offersTemplate = this._createOffersTemplate(offers);

    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} to ${destination}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${startDate}">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${endDate}">${endTime}</time>
            </p>
            <p class="event__duration">${duration}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersTemplate}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  _getTemplate() {
    return this._createTemplate(this._point);
  }

  _editOpenClickHandler(evt) {
    evt.preventDefault();
    this._callback.editOpenClick();
  }

  setEditOpenClickHandler(callback) {
    this._callback.editOpenClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editOpenClickHandler);
  }
}
