import AbstractView from "./abstract";
import {SortType} from "../const";

export default class Sorting extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _createTemplate(currentSortType) {
    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
  
        <div class="trip-sort__item  trip-sort__item--event ${currentSortType === SortType.DEFAULT ? `trip-sort__item--active` : ``}">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" data-sort-type="${SortType.DEFAULT}" ${currentSortType === SortType.DEFAULT ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>
  
        <div class="trip-sort__item  trip-sort__item--time ${currentSortType === SortType.DURATION_DOWN ? `trip-sort__item--active` : ``}">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.DURATION_DOWN}" ${currentSortType === SortType.DURATION_DOWN ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-time">
            Time
            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>
          </label>
        </div>
  
        <div class="trip-sort__item  trip-sort__item--price ${currentSortType === SortType.PRICE_DOWN ? `trip-sort__item--active` : ``}">
          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE_DOWN}" ${currentSortType === SortType.PRICE_DOWN ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-price">
            Price
            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>
          </label>
        </div>
  
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
    );
  }

  _getTemplate() {
    return this._createTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

