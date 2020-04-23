import AbstractComponent from "./abstract-component.js";
import {getDayDateFormat} from "../utils/util.js";

const createDayListTemplate = (list) => {

  return (`<ul class="trip-days">
          ${list}
          </ul>`);
};

const createDayItemTemplate = (events, day = ``) => {

  return (`<li class="trip-days__item  day">
            <div class="day__info">
            ${day}
            </div>
            ${events}
          </li>`);
};

const createDayInfoTemplate = (day) => {
  const {order, dateTime} = day;
  const date = getDayDateFormat(dateTime);

  return (`<span class="day__counter">${order}</span>
                <time class="day__date" datetime="${date}">${date}</time>`);
};

const createEventItemTemplate = () => {
  return (`<li class="trip-events__item"></li>`);
};

const createEventListTemplate = (tripEvents) => {
  const eventList = tripEvents.map(() => createEventItemTemplate()).join(`\n`);

  return (`<ul class="trip-events__list">${eventList}</ul>`);
};

const getDefaultListTemplate = (tripEvents) => {
  const eventList = createDayItemTemplate(createEventListTemplate(tripEvents));

  return createDayListTemplate(eventList);
};

const getGroupByDayListTemplate = (batchTripEvents) => {
  const eventList = batchTripEvents.reduce((acc, tripEvents) => {
    const [day, events] = tripEvents;
    acc += createDayItemTemplate(createEventListTemplate(events), createDayInfoTemplate(day));
    return acc;
  }, ``);

  return createDayListTemplate(eventList);
};

export const TripDayListType = {
  LIST_DEFAULT: `default`,
  LIST_GROUP: `group`,
};

export class TripDay extends AbstractComponent {

  constructor(tripEvents, type) {
    super();
    this._tripEvents = tripEvents;
    this._type = type;
  }

  getTemplate() {
    switch (this._type) {
      case TripDayListType.LIST_DEFAULT:
        return getDefaultListTemplate(this._tripEvents);
      case TripDayListType.LIST_GROUP:
        return getGroupByDayListTemplate(this._tripEvents);
      default:
        return ``;
    }
  }

}
