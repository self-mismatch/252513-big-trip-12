import WaypointView from "../view/waypoint";
import WaypointEditView from "../view/waypoint-edit";

import {render, replace, remove} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class Waypoint {
  constructor(waypointContainer, changeData, changeMode) {
    this._waypointContainer = waypointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._waypointComponent = null;
    this._waypointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditOpenClick = this._handleEditOpenClick.bind(this);
    this._handleEditCloseClick = this._handleEditCloseClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    this._prevWaypointComponent = this._waypointComponent;
    this._prevWaypointEditComponent = this._waypointEditComponent;

    this._waypointComponent = new WaypointView(waypoint);
    this._waypointEditComponent = new WaypointEditView(waypoint);

    this._waypointComponent.setEditOpenClickHandler(this._handleEditOpenClick);
    this._waypointEditComponent.setEditCloseClickHandler(this._handleEditCloseClick);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditComponent.setFavouriteClickHandler(this._handleFavouriteClick);

    if (!this._prevWaypointComponent || !this._prevWaypointEditComponent) {
      render(this._waypointContainer, this._waypointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._waypointComponent, this._prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._waypointEditComponent, this._prevWaypointEditComponent);
    }

    remove(this._prevWaypointComponent);

    this._prevWaypointEditComponent.removeDatepicker();
    remove(this._prevWaypointEditComponent);
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointEditComponent);
  }

  resetView() {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    this._replaceFormToWaypoint();
  }

  _escKeyDownHandler(evt) {
    if (evt.key !== `Escape` && evt.key !== `Esc`) {
      return;
    }

    evt.preventDefault();
    this._waypointEditComponent.reset(this._waypoint);
    this._replaceFormToWaypoint();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceWaypointToForm() {
    replace(this._waypointEditComponent, this._waypointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToWaypoint() {
    replace(this._waypointComponent, this._waypointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleEditOpenClick() {
    this._replaceWaypointToForm();
  }

  _handleEditCloseClick() {
    this._waypointEditComponent.reset(this._waypoint);
    this._replaceFormToWaypoint();
  }

  _handleFormSubmit(waypoint) {
    this._changeData(waypoint);
    this._replaceFormToWaypoint();
  }

  _handleFavouriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._waypoint,
            {
              isFavourite: !this._waypoint.isFavourite
            }
        )
    );
  }
}
