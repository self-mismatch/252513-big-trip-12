import {getFormatedWaypointTime, getFormatedWaypointDate, getWaypointDuration} from "../utils/date";

const createOffersTemplate = (offers) => {
  let template = ``;

  offers.forEach((offer) => {
    template += `<li class="event__offer">
      <span class="event__offer-title">${offer.fullName}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`;
  });

  return template;
};

export const createWaypointTemplate = (waypoint) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = waypoint;

  const startDate = getFormatedWaypointDate(dateFrom);
  const endDate = getFormatedWaypointDate(dateTo);
  const startTime = getFormatedWaypointTime(dateFrom);
  const endTime = getFormatedWaypointTime(dateTo);

  const duration = getWaypointDuration(dateFrom, dateTo);

  const offersTemplate = createOffersTemplate(offers);

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
};
