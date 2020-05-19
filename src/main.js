import API from "./api";
import {AUTHORIZATION, URL} from "./config";
import MainController from "./controllers/main-controller";
import TripEventStore from "./models/trip-event-store";
import EventOfferStore from "./models/event-offer-store";
import EventDestinationStore from "./models/event-destination-store";

const api = new API(URL, AUTHORIZATION);
const eventDestinationStore = new EventDestinationStore();
const eventOfferStore = new EventOfferStore();
const tripEventStore = new TripEventStore(api);

const mainController = new MainController(tripEventStore);

api.getDestinations()
  .then((destinations) => eventDestinationStore.setDestinations(destinations))
  .catch((error) => eventDestinationStore.setErrors(error));

api.getOffers()
  .then((offers) => eventOfferStore.setOffers(offers))
  .catch((error) => eventOfferStore.setErrors(error));

api.getTripEvents()
  .then((tripEvents) => tripEventStore.setTripEvents(tripEvents))
  .catch((error) => tripEventStore.setErrors(error))
  .finally(() => mainController.init());
