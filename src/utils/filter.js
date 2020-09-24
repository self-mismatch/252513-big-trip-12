import {FilterType} from "../const.js";

const getFuturePoints = (points) => {
  return points.filter((point) => point.dateFrom > new Date());
};

const getPastPoints = (points) => {
  return points.filter((point) => point.dateTo < new Date());
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => getFuturePoints(points.slice()),
  [FilterType.PAST]: (points) => getPastPoints(points.slice()),
};

export {filter};
