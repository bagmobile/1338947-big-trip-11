import EventDestinationStore from "./models/event-destination-store.js";
import EventOfferStore from "./models/event-offer-store.js";
import TripEventStore from "./models/trip-event-store";
import {TripEventModel} from "./models/trip-event-model";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export default class API {

  constructor(host, authorization) {
    this._host = host;
    this._authorization = authorization;
  }

  getTripEvents() {
    return this._load({path: `points`})
      .then((response) => response.json())
      .then(TripEventStore.parse);
  }

  getDestinations() {
    return this._load({path: `destinations`})
      .then((response) => response.json())
      .then(EventDestinationStore.parse);
  }

  getOffers() {
    return this._load({path: `offers`})
      .then((response) => response.json())
      .then(EventOfferStore.parse);
  }

  createTripEvent(tripEvent) {

    return this._load({
      path: `points`,
      method: Method.POST,
      body: JSON.stringify(TripEventModel.toRAW(tripEvent)),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then(TripEventModel.parse);
  }

  updateTripEvent(id, tripEvent) {
    return this._load({
      path: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(TripEventModel.toRAW(tripEvent)),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then(TripEventModel.parse);
  }

  deleteTripEvent(id) {
    return this._load({path: `points/${id}`, method: Method.DELETE});
  }

  _load({path, method = Method.GET, body = null, headers = new Headers()}) {

    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._host}/${path}`, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
