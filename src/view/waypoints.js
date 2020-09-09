import {createElement} from "../utils/render";

export default class Waypoints {
  constructor() {
    this._element = null;
  }

  _createTemplate() {
    return (
      `<ul class="trip-events__list"></ul>`
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
