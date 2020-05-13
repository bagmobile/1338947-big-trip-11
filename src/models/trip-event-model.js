import * as config from "../config";
import moment from "moment";
import * as utils from "../utils/utils";

export default class TripEventModel {

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

  static getDefaultTripEvent() {

    return new TripEventModel({
      id: null,
      type: config.getDefaultTripEventType(),
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
  }

  getTitle() {
    return `${this.getRoute(this.type)} ${this.destination.name}`;
  }

  getRoutePrefix(type) {
    for (const [key, value] of config.tripEventTypes) {
      if (value.includes(type)) {
        return key;
      }
    }
    return ``;
  }

  getRoute(type) {
    return `${utils.upperFirstChar(type)} ${this.getRoutePrefix(type)}`;
  }

}

