import * as util from "../util.js";
import {
  generateEvents,
  getEventTypes as getTypes,
  getEventTowns as getTowns,
  getEventOffers as getOffers,
} from "../mock/event-mock.js";

const routePrefixes = [`to`, `in`];
const durationSigns = [`D`, `H`, `M`];

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

const getTitle = (evt) => {
  return `${evt.type} ${getRoutePrefix(evt.type)} ${evt.town}`;
};

const getIcon = (type) => {
  return `${type.toLowerCase()}.png`;
};

const getRoutePrefix = (evt) => {
  let prefix = ``;
  getTypes().forEach((type, index) => {
    if (type.includes(evt.type)) {
      prefix = routePrefixes[index];
    }
  });
  return prefix;
};

const getDuration = (evt) => {
  return util.getDiffDate(evt.startDateTime, evt.endDateTime).map((time, index) => {
    return (time === 0) ? `` : time + durationSigns[index];
  }).join(` `);
};

const prepareEvent = (evt) => {
  evt.title = getTitle(evt);
  evt.icon = getIcon(evt.type);
  evt.duration = getDuration(evt);
  evt.routePrefix = getRoutePrefix(evt);
  return evt;
};

const sortEventsByDay = (tripEvents) => {
  return tripEvents.sort(function (a, b) {
    return a.endDateTime.getTime() - b.endDateTime.getTime();
  });
};

export const getEvents = () => {
  /* Заглушка на моковые данные*/
  const tripEvents = generateEvents(tripEvent);
  return sortEventsByDay(tripEvents.map((evt) => prepareEvent(evt)));
};

export const prepareEventsByDays = (events) => {
  let uniqueDays = [...events.reduce((acc, elem) => acc.add(elem.endDateTime.toISOString()), new Set())];
  return uniqueDays.reduce((acc, day, index) => {
    acc.push([{
      order: ++index,
      dateTime: new Date(day),
    }, events.filter((evt) => evt.endDateTime.toISOString() === day)]);
    return acc;
  }, []);
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

