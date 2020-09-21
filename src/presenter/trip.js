import DayView from "../view/day";
import NoPointView from "../view/no-point";
import SortingView from "../view/sorting";
import TripView from "../view/trip";
import PointListView from "../view/point-list";

import PointPresenter from "../presenter/point";

import {FilterType, SortType, UpdateType, UserAction} from "../const";
import {remove, render} from "../utils/render";
import {filter} from "../utils/filter.js";
import {sortPointsByDays, sortPointsDurationDown, sortPointsPriceDown} from "../utils/sorting";

export default class Trip {
  constructor(tripContainer, pointsModel, filtersModel) {
    this._tripContainer = tripContainer;

    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._currentFilterType = FilterType.EVERYTHING;

    this._sortingComponent = null;
    this._currentSortType = SortType.DEFAULT;

    this._noPointsComponent = new NoPointView();
    this._tripComponent = new TripView();

    this._pointPresenter = {};

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    const filterType = this._filtersModel.getFilter();
    // if (filterType !== this._currentFilterType) {
    //   this._currentSortType = SortType.DEFAULT;
    //   this._filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    // }

    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DURATION_DOWN:
        return sortPointsDurationDown(filteredPoints);
      case SortType.PRICE_DOWN:
        return sortPointsPriceDown(filteredPoints);
      default:
        return sortPointsByDays(filteredPoints);
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip();
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearTrip();
    this._renderTrip();
  }

  _renderSorting() {
    if (this._sortComponent) {
      this._sortComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortingComponent);
  }

  _renderPoint(pointContainer, point) {
    const pointPresenter = new PointPresenter(pointContainer, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(pointListComponent, points) {
    points.forEach((point) => {
      this._renderPoint(pointListComponent, point);
    });
  }

  _renderDay(day, index, isGrouped) {
    const dayComponent = new DayView(day, index, isGrouped);
    render(this._tripComponent, dayComponent);

    const pointListComponent = new PointListView();
    render(dayComponent, pointListComponent);

    this._renderPoints(pointListComponent, day);
  }

  _renderDays() {
    const isGrouped = this._currentSortType === SortType.DEFAULT;

    this._getPoints().forEach((day, index) => {
      this._renderDay(day, index, isGrouped);
    });
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointsComponent);
  }

  _clearTrip() {
    remove(this._sortingComponent);

    if (this._noPointsComponent) {
      remove(this._noPointsComponent);
      this._noPointsComponent = null;
    }

    remove(this._tripComponent);
    this._tripComponent = null;
    // Object
    //   .values(this._pointPresenter)
    //   .forEach((presenter) => presenter.destroy());
    // this._pointPresenter = {};
  }

  _renderTrip() {
    const pointsCount = this._getPoints().length;

    this._renderSorting();

    if (!this._tripComponent) {
      this._tripComponent = new TripView();
    }
    render(this._tripContainer, this._tripComponent);

    if (pointsCount === 0) {
      this._noPointsComponent = new NoPointView();
      this._renderNoPoints();
      return;
    }

    this._renderDays();
  }
}
