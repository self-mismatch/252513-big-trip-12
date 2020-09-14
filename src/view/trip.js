import AbstractView from "./abstract";

export default class Trip extends AbstractView {
  _createTemplate() {
    return (
      `<ul class="trip-days"></ul>`
    );
  }

  _getTemplate() {
    return this._createTemplate();
  }
}

