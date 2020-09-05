import {createWaypointTemplate} from "./waypoint";
import {createWaypointEditTemplate} from "./waypoint-edit";

export const createWaypointsTemplate = (waypoints, index) => {
  let waypointsTemplate = ``;

  if (index === 1) {
    waypointsTemplate += createWaypointEditTemplate(waypoints[0]);
  }

  waypoints.forEach((waypoint) => {
    waypointsTemplate += createWaypointTemplate(waypoint);
  });

  return waypointsTemplate;
};
