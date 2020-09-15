import InfoView from "./view/info";
import FilterView from "./view/filter";
import MenuView from "./view/menu";

import TripPresenter from "./presenter/trip";

import {RenderPosition} from "./const";
import {render} from "./utils/render";

import {generateWaypoint} from "./mock/waypoint";
import {sortWaypointsByDays} from "./utils/sorting";

const WAYPOINTS_COUNT = 10;

const waypoints = new Array(WAYPOINTS_COUNT).fill().map(generateWaypoint);
const daysWithSortedWaypoints = sortWaypointsByDays(waypoints.slice());

const pageHeader = document.querySelector(`.page-header`);
const tripMain = pageHeader.querySelector(`.trip-main`);
const controls = tripMain.querySelector(`.trip-controls`);
const tabsTitle = controls.querySelector(`h2:first-of-type`);
const filtersTitle = controls.querySelector(`h2:last-of-type`);

render(tripMain, new InfoView(daysWithSortedWaypoints), `afterbegin`);
render(controls, new MenuView(), RenderPosition.AFTERELEMENT, tabsTitle);
render(controls, new FilterView(), RenderPosition.AFTERELEMENT, filtersTitle);

const pageMain = document.querySelector(`.page-main`);
const events = pageMain.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(events);
tripPresenter.init(waypoints);
