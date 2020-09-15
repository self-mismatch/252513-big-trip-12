// NOTE: Отрефакторить

const getWaypointsDays = (waypoints) => {
  let days = new Set();

  waypoints.forEach((waypoint) => {
    days.add(waypoint.dateFrom.getDate());
  });

  days = Array.from(days);

  return days;
};

const groupWaypoints = (waypoints) => {
  return [waypoints];
};

const groupWaypointsByDays = (waypoints) => {
  const days = getWaypointsDays(waypoints);
  const groupedWaypoints = [];

  for (let i = 0; i < days.length; i++) {
    groupedWaypoints.push([]);
  }

  let currentDay = 0;

  waypoints.forEach((waypoint) => {
    if (waypoint.dateFrom.getDate() !== days[currentDay]) {
      currentDay++;
    }

    groupedWaypoints[currentDay].push(waypoint);
  });

  return groupedWaypoints;
};

const sortWaypointsByDays = (waypoints) => {
  const sortedWaypoints = waypoints.sort((a, b) => {
    return a.dateFrom - b.dateFrom;
  });

  return groupWaypointsByDays(sortedWaypoints);
};

const sortWaypointsDurationDown = (waypoints) => {
  const sortedWaypoints = waypoints.sort((a, b) => {
    return (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom);
  });

  return groupWaypoints(sortedWaypoints);
};

const sortWaypointsPriceDown = (waypoints) => {
  const sortedWaypoints = waypoints.sort((a, b) => {
    return b.basePrice - a.basePrice;
  });

  return groupWaypoints(sortedWaypoints);
};

export {sortWaypointsByDays, sortWaypointsDurationDown, sortWaypointsPriceDown};
