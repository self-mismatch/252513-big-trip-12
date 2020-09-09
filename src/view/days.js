import {createElement} from "../utils/render";

export default class Days {
  constructor() {
    this._element = null;
  }

  _createTemplate() {
    return (
      `<ul class="trip-days"></ul>`
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

