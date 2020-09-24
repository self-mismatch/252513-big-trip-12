// NOTE: Отрефакторить

const getPointsDays = (points) => {
  let days = new Set();

  points.forEach((point) => {
    days.add(point.dateFrom.getDate());
  });

  days = Array.from(days);

  return days;
};

const groupPoints = (points) => {
  return [points];
};

const groupPointsByDays = (points) => {
  const days = getPointsDays(points);
  const groupedPoints = [];

  for (let i = 0; i < days.length; i++) {
    groupedPoints.push([]);
  }

  let currentDay = 0;

  points.forEach((point) => {
    if (point.dateFrom.getDate() !== days[currentDay]) {
      currentDay++;
    }

    groupedPoints[currentDay].push(point);
  });

  return groupedPoints;
};

const sortPointsByDays = (points) => {
  const sortedPoints = points.sort((a, b) => {
    return a.dateFrom - b.dateFrom;
  });

  return groupPointsByDays(sortedPoints);
};

const sortPointsDurationDown = (points) => {
  const sortedPoints = points.sort((a, b) => {
    return (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom);
  });

  return groupPoints(sortedPoints);
};

const sortPointsPriceDown = (points) => {
  const sortedPoints = points.sort((a, b) => {
    return b.basePrice - a.basePrice;
  });

  return groupPoints(sortedPoints);
};

export {sortPointsByDays, sortPointsDurationDown, sortPointsPriceDown};
