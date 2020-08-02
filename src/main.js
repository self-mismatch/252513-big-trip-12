import {createDayTemplate} from "./view/day";
import {createDaysTemplate} from "./view/days";
import {createDayEventTemplate} from "./view/day-event";
import {createDayEventsTemplate} from "./view/day-events";
import {createDayInfoTemplate} from "./view/day-info";
import {createInfoTemplate} from "./view/info";
import {createFilterTemplate} from "./view/filter";
import {createMenuTemplate} from "./view/menu";
import {createeSortingTemplate} from "./view/sorting";

const DAY_EVENTS_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.page-header`);
const tripMain = pageHeader.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripControlsTabsTitle = tripControls.querySelector(`h2:first-of-type`);

render(tripMain, createInfoTemplate(), `afterbegin`);
render(tripControlsTabsTitle, createMenuTemplate(), `afterend`);
render(tripControls, createFilterTemplate());

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

render(tripEvents, createeSortingTemplate());
render(tripEvents, createDaysTemplate());

const tripDays = tripEvents.querySelector(`.trip-days`);

render(tripDays, createDayTemplate());

const tripDay = tripDays.querySelector(`.trip-days__item`);

render(tripDay, createDayInfoTemplate());
render(tripDay, createDayEventsTemplate());

const tripDayEvents = tripDay.querySelector(`.trip-events__list`);

for (let i = 0; i < DAY_EVENTS_COUNT; i++) {
  render(tripDayEvents, createDayEventTemplate());
}
