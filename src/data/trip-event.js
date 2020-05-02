import * as util from "../utils/utils.js";
import {
  generateEvents,
  getEventTypes as getTypes,
  getEventTowns as getTowns,
  getEventOffers as getOffers,
} from "../mock/event-mock.js";

const routePrefixes = [`to`, `in`];

const tripEvent = {
  type: ``,
  town: ``,
  startDateTime: null,
  endDateTime: null,
  price: 0,
  offers: [],
  destination: {},
  isFavorite: false,
};

export const getTitle = (evt) => {
  return `${util.upperFirstChar(evt.type)} ${getRoutePrefix(evt.type)} ${evt.town}`;
};

const sortEventsByDay = (tripEvents) => {
  return tripEvents.sort(function (a, b) {
    return a.endDateTime.getTime() - b.endDateTime.getTime();
  });
};

export const getRoutePrefix = (eventType) => {
  let prefix = ``;
  getTypes().forEach((type, index) => {
    if (type.includes(eventType)) {
      prefix = routePrefixes[index];
    }
  });
  return prefix;
};


export const getEvents = () => {
  /* Заглушка на моковые данные*/
  const tripEvents = generateEvents(tripEvent);
  return sortEventsByDay(tripEvents);
};

export const getEventTypes = () => {
  return getTypes();
};

export const getEventTowns = () => {
  return getTowns();
};

export const getEventOffers = () => {
  return getOffers();
};

