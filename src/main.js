import MainController from "./controllers/main-controller";
import TripEventStore from "./models/trip-event-store";
import EventOfferStore from "./models/event-offer-store";
import EventDestinationStore from "./models/event-destination-store";
import API from "./api";

const URL = `https://11.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic kTy9gIdsz2317rA`;

const api = new API(URL, AUTHORIZATION);
const eventDestinationStore = new EventDestinationStore();
const eventOfferStore = new EventOfferStore();
const tripEventStore = new TripEventStore(api);

const mainController = new MainController(tripEventStore);

api.getDestinations().then((destinations) => {
  eventDestinationStore.setDestinations(destinations);
}, (error) => {
  eventDestinationStore.setErrors(error);
});


api.getOffers().then((offers) => {
  eventOfferStore.setOffers(offers);
}, (error) => {
  eventOfferStore.setErrors(error);
});


api.getTripEvents().then((tripEvents) => {
  tripEventStore.setTripEvents(tripEvents);
  mainController.init(tripEventStore);
});
