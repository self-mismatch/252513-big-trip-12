import AbstractView from "./abstract";

export default class NoWaypoint extends AbstractView {
  _createTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`
    );
  }

  _getTemplate() {
    return this._createTemplate();
  }
}
