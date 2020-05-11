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

  static parse(tripEvent) {

    return new TripEventModel({
      id: tripEvent[`id`],
      type: tripEvent[`type`],
      startDateTime: tripEvent[`date_from`],
      endDateTime: tripEvent[`date_to`],
      price: tripEvent[`base_price`],
      isFavorite: tripEvent[`is_favorite`],
      offers: tripEvent[`offers`],
      destination: tripEvent[`destination`],
    });
  }

  static toRAW(tripEvent) {
    return {
      "id": tripEvent.id,
      "type": tripEvent.type,
      "date_from": tripEvent.startDateTime,
      "date_to": tripEvent.endDateTime,
      "base_price": tripEvent.price,
      "is_favorite": tripEvent.isFavorite,
      "offers": tripEvent.offers,
      "destination": tripEvent.destination,
    };
  }
}

export const getDefaultTripEvent = () => {

  return new TripEventModel({
    id: null,
    type: getDefaultTripEventType(),
    startDateTime: moment(new Date()).toISOString(true),
    endDateTime: moment(new Date()).toISOString(true),
    price: 0,
    offers: [],
    destination: {
      description: ``,
      name: ``,
      pictures: [],
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

