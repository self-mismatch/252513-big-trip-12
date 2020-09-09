import DayView from "./view/day";
import DaysView from "./view/days";
import InfoView from "./view/info";
import FilterView from "./view/filter";
import MenuView from "./view/menu";
import NoWaypointView from "./view/no-waypoint";
import SortingView from "./view/sorting";
import WaypointView from "./view/waypoint";
import WaypointEditView from "./view/waypoint-edit";
import WaypointsView from "./view/waypoints";

import {render} from "./utils/render";
import {RenderPosition} from "./const";

import {generateWaypoint} from "./mock/waypoint";
import {sortWaypointsByDate} from "./utils/sorting";

const WAYPOINTS_COUNT = 50;

const waypoints = new Array(WAYPOINTS_COUNT).fill().map(generateWaypoint);
const daysWithSortedWaypoints = sortWaypointsByDate(waypoints);

const pageHeader = document.querySelector(`.page-header`);
const tripMain = pageHeader.querySelector(`.trip-main`);
const controls = tripMain.querySelector(`.trip-controls`);
const tabsTitle = controls.querySelector(`h2:first-of-type`);
const filtersTitle = controls.querySelector(`h2:last-of-type`);

render(tripMain, new InfoView(daysWithSortedWaypoints).getElement(), `afterbegin`);
render(controls, new MenuView().getElement(), RenderPosition.AFTEREND, tabsTitle);
render(controls, new FilterView().getElement(), RenderPosition.AFTEREND, filtersTitle);

const pageMain = document.querySelector(`.page-main`);
const events = pageMain.querySelector(`.trip-events`);
render(events, new SortingView(waypoints).getElement());

const renderWaypoint = (waypointsElement, waypoint) => {
  const waypointComponent = new WaypointView(waypoint);
  const waypointEditComponent = new WaypointEditView(waypoint);

  const replaceWaypointToForm = () => {
    waypointsElement.replaceChild(waypointEditComponent.getElement(), waypointComponent.getElement());
  };

  const replaceFormToWaypoint = () => {
    waypointsElement.replaceChild(waypointComponent.getElement(), waypointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key !== `Escape` && evt.key !== `Esc`) {
      return;
    }

    evt.preventDefault();
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  waypointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceWaypointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  waypointEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  waypointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(waypointsElement, waypointComponent.getElement());
};

const renderDay = (daysElement, day, index) => {
  const dayComponent = new DayView(day, index);
  const dayElement = dayComponent.getElement();
  render(daysElement, dayElement);

  const waypointsComponent = new WaypointsView();
  const waypointsElement = waypointsComponent.getElement();
  render(dayComponent.getElement(), waypointsElement);

  day.forEach((waypoint) => {
    renderWaypoint(waypointsElement, waypoint);
  });
};

const renderDays = (daysContainer, waypointsDays) => {
  if (waypointsDays.length === 0) {
    render(daysContainer, new NoWaypointView().getElement());
    return;
  }

  const daysComponent = new DaysView();
  render(daysContainer, daysComponent.getElement());

  waypointsDays.forEach((day, index) => {
    renderDay(daysComponent.getElement(), day, index);
  });
};

renderDays(events, daysWithSortedWaypoints);
