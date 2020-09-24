import FiltersModel from "./model/filters";
import PointsModel from "./model/points";

import InfoView from "./view/info";
import MenuView from "./view/menu";

import FilterPresenter from "./presenter/filter";
import TripPresenter from "./presenter/trip";

import {RenderPosition} from "./const";
import {render} from "./utils/render";

import {generatePoint} from "./mock/point";
import {sortPointsByDays} from "./utils/sorting";

const POINTS_COUNT = 10;

const points = new Array(POINTS_COUNT).fill().map(generatePoint);
const daysWithSortedPoints = sortPointsByDays(points.slice());

const filtersModel = new FiltersModel();

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const pageHeader = document.querySelector(`.page-header`);
const tripMain = pageHeader.querySelector(`.trip-main`);
const controls = tripMain.querySelector(`.trip-controls`);
const tabsTitle = controls.querySelector(`h2:first-of-type`);
const filtersTitle = controls.querySelector(`h2:last-of-type`);

render(tripMain, new InfoView(daysWithSortedPoints), `afterbegin`);
render(controls, new MenuView(), RenderPosition.AFTERELEMENT, tabsTitle);

const pageMain = document.querySelector(`.page-main`);
const events = pageMain.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(events, pointsModel, filtersModel);
const filterPresenter = new FilterPresenter(controls, filtersTitle, filtersModel, pointsModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
