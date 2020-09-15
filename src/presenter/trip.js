import DayView from "../view/day";
import NoWaypointView from "../view/no-waypoint";
import SortingView from "../view/sorting";
import TripView from "../view/trip";
import WaypointView from "../view/waypoint";
import WaypointEditView from "../view/waypoint-edit";
import WaypointListView from "../view/waypoint-list";

import {SortType} from "../const";
import {render, replace} from "../utils/render";
import {sortWaypointsByDays, sortWaypointsDurationDown, sortWaypointsPriceDown} from "../utils/sorting";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortingComponent = new SortingView();
    this._currentSortType = SortType.DEFAULT;

    this._sourcedWaypoints = null;
    this._sortedWaypointsByDays = null;
    this._waypoints = null;

    this._noWaypointsComponent = new NoWaypointView();
    this._tripComponent = new TripView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(waypoints) {
    this._sourcedWaypoints = waypoints.slice();
    this._sortedWaypointsByDays = sortWaypointsByDays(this._sourcedWaypoints.slice());
    this._waypoints = this._sortedWaypointsByDays.slice();

    this._renderSort();

    render(this._tripContainer, this._tripComponent);
    this._renderTrip();
  }

  _sortWaypoints(sortType) {
    switch (sortType) {
      case SortType.DURATION_DOWN:
        this._waypoints = sortWaypointsDurationDown(this._sourcedWaypoints.slice());
        break;
      case SortType.PRICE_DOWN:
        this._waypoints = sortWaypointsPriceDown(this._sourcedWaypoints.slice());
        break;
      default:
        this._waypoints = this._sortedWaypointsByDays.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortWaypoints(sortType);
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _renderDay(day, index, isGrouped) {
    const dayComponent = new DayView(day, index, isGrouped);
    render(this._tripComponent, dayComponent);

    const waypointListComponent = new WaypointListView();
    render(dayComponent, waypointListComponent);

    day.forEach((waypoint) => {
      this._renderWaypoint(waypointListComponent, waypoint);
    });
  }

  _renderDays() {
    const isGrouped = this._currentSortType === SortType.DEFAULT;

    this._waypoints.forEach((day, index) => {
      this._renderDay(day, index, isGrouped);
    });
  }

  _renderNoWaypoints() {
    render(this._tripContainer, new NoWaypointView());
  }

  _clearTrip() {
    this._tripComponent.getElement().innerHTML = ``;
  }

  _renderTrip() {
    if (this._waypoints.length === 0) {
      this._renderNoWaypoints();
      return;
    }

    this._renderDays();
  }
}
