// const getFirstDayDate = (waypoints) => {
//   let firstDayDate = 31;

//   waypoints.forEach((waypoint) => {
//     const currentWaypointDay = waypoint.dateFrom.getDate();

//     if (currentWaypointDay < firstDayDate) {
//       firstDayDate = currentWaypointDay;
//     }
//   });

//   return firstDayDate;
// };

const getWaypointsDays = (waypoints) => {
  const days = [];

  waypoints.forEach((waypoint) => {
    const day = waypoint.dateFrom.getDate();

    if (!days.includes(day)) {
      days.push(day);
    }
  });

  return days;
};

// Улучшить
const sortWaypointsByDate = (waypoints) => {
  const sortedWaypoints = waypoints.sort((a, b) => {
    return a.dateFrom - b.dateFrom;
  });

  const days = getWaypointsDays(waypoints);

  const sortedWaypointsByDays = [];

  for (let i = 0; i < days.length; i++) {
    sortedWaypointsByDays.push([]);
  }

  let currentDay = 0;

  sortedWaypoints.forEach((waypoint) => {
    if (waypoint.dateFrom.getDate() !== days[currentDay]) {
      currentDay++;
    }

    sortedWaypointsByDays[currentDay].push(waypoint);
  });

  return sortedWaypointsByDays;
};

export {sortWaypointsByDate};
