import DayView from "../view/day";
import NoWaypointView from "../view/no-waypoint";
import TripView from "../view/trip";
import WaypointView from "../view/waypoint";
import WaypointEditView from "../view/waypoint-edit";
import WaypointListView from "../view/waypoint-list";

import {render, replace} from "../utils/render";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._waypoints = null;

    this._noWaypointsComponent = new NoWaypointView();
    this._tripComponent = new TripView();
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();

    render(this._tripContainer, this._tripComponent);

    this._renderTrip();
  }

  _renderWaypoint(waypointContainer, waypoint) {
    const waypointComponent = new WaypointView(waypoint);
    const waypointEditComponent = new WaypointEditView(waypoint);

    const replaceFormToWaypoint = () => {
      replace(waypointComponent, waypointEditComponent);
    };

    const replaceWaypointToForm = () => {
      replace(waypointEditComponent, waypointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key !== `Escape` && evt.key !== `Esc`) {
        return;
      }

      evt.preventDefault();
      replaceFormToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    waypointComponent.setEditClickHandler(() => {
      replaceWaypointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    waypointEditComponent.setEditClickHandler(() => {
      replaceFormToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    waypointEditComponent.setFormSubmitHandler(() => {
      replaceFormToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(waypointContainer, waypointComponent);
  }

  _renderDay(day, index) {
    const dayComponent = new DayView(day, index);
    render(this._tripComponent, dayComponent);

    const waypointListComponent = new WaypointListView();
    render(dayComponent, waypointListComponent);

    day.forEach((waypoint) => {
      this._renderWaypoint(waypointListComponent, waypoint);
    });
  }

  _renderDays() {
    this._waypoints.forEach((day, index) => {
      this._renderDay(day, index);
    });
  }

  _renderNoWaypoints() {
    render(this._tripContainer, new NoWaypointView());
  }

  _renderTrip() {
    if (this._waypoints.length === 0) {
      this._renderNoWaypoints();
      return;
    }

    this._renderDays();
  }
}
