import {MAX_COUNT_DAY_LIST} from "./config";
import {createTripEventList} from "./trip-event.js";
import {getTripData} from "./trip-data.js";

const createTripDayItemTemplate = (tripDay, order) => {
  return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${order}</span>
                <time class="day__date" datetime="${tripDay.dateTime}">${tripDay.dateTime.toDateString()}</time>
              </div>
              ${createTripEventList(tripDay.events)};
            </li>`);
};

const getItems = () => {
  return getTripData(MAX_COUNT_DAY_LIST).map((tripDay, order) => `${createTripDayItemTemplate(tripDay, order + 1)}`);
};

export const createTripDayListTemplate = () => {
  return (`<ul class="trip-days">
            ${getItems()}
          </ul>`);
};
