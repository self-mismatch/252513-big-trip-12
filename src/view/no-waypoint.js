import {createElement} from "../utils/render";

export default class NoWaypoint {
  constructor() {
    this._element = null;
  }

  _createTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`
    );
  }

  _getTemplate() {
    return this._createTemplate();
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
