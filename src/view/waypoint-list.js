import AbstractView from "./abstract";

export default class WaypointList extends AbstractView {
  _createTemplate() {
    return (
      `<ul class="trip-events__list"></ul>`
    );
  }

  _getTemplate() {
    return this._createTemplate();
  }
}
