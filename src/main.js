import {createDaysTemplate} from "./view/days";
import {createInfoTemplate} from "./view/info";
import {createFilterTemplate} from "./view/filter";
import {createMenuTemplate} from "./view/menu";
import {createSortingTemplate} from "./view/sorting";

import {generateWaypoint} from "./mock/waypoint";
import {sortWaypointsByDate} from "./utils/sorting";

const WAYPOINTS_COUNT = 20;

const waypoints = new Array(WAYPOINTS_COUNT).fill().map(generateWaypoint);
const sortedWaypoints = sortWaypointsByDate(waypoints);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.page-header`);
const tripMain = pageHeader.querySelector(`.trip-main`);
const controls = tripMain.querySelector(`.trip-controls`);
const controlsTabsTitle = controls.querySelector(`h2:first-of-type`);

render(tripMain, createInfoTemplate(sortedWaypoints), `afterbegin`);
render(controlsTabsTitle, createMenuTemplate(), `afterend`);
render(controls, createFilterTemplate());

const pageMain = document.querySelector(`.page-main`);
const events = pageMain.querySelector(`.trip-events`);

render(events, createSortingTemplate());
render(events, createDaysTemplate(sortedWaypoints));
