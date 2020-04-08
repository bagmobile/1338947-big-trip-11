import {tripDays} from "../data/data.js";

export const getTripData = (count) => {
  return tripDays.slice(0, count);
};
