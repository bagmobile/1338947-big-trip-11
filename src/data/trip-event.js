import * as util from "../utils/utils.js";
import * as config from "../config.js";
import moment from "moment";

export class TripEventModel {

  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.startDateTime = data.startDateTime;
    this.endDateTime = data.endDateTime;
    this.price = data.price;
    this.offers = data.offers;
    this.destination = data.destination;
    this.isFavorite = data.isFavorite;
  }
}

export const getDefaultTripEvent = () => {

  return new TripEventModel({
    id: String(Math.random()),
    type: getDefaultTripEventType(),
    startDateTime: moment(new Date()).toISOString(true),
    endDateTime: moment(new Date()).toISOString(true),
    price: 0,
    offers: [],
    destination: {
      description: ``,
      name: ``,
      photos: [],
    },
    isFavorite: false,
  });
};

export const getTitle = (tripEvent) => {
  return `${getRoute(tripEvent.type)} ${tripEvent.destination.name}`;
};

export const getRoutePrefix = (tripEventType) => {
  for (const [key, value] of config.tripEventTypes) {
    if (value.includes(tripEventType)) {
      return key;
    }
  }
  return ``;
};

export const getRoute = (eventType) => {
  return `${util.upperFirstChar(eventType)} ${getRoutePrefix(eventType)}`;
};

export const getTripEventTypes = () => {
  return [...config.tripEventTypes.values()];
};

export const getDefaultTripEventType = () => {
  return getTripEventTypes()[0][0];
};

