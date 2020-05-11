import TripEventStore from "./models/trip-event-store.js";
import EventDestinationStore from "./models/event-destination-store.js";
import EventOfferStore from "./models/event-offer-store.js";
import FilterController from "./controllers/filter-controller.js";
import MenuController from "./controllers/menu-controllers.js";
import TripStatsController from "./controllers/trip-stats-controller.js";
import TripInfoController from "./controllers/trip-info-controller.js";
import {TripBoardController} from "./controllers/trip-board-controller.js";
import {MenuTab} from "./config.js";
import API from "./api.js";

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const headerFilterElement = tripControlElement.querySelector(`h2:last-child`);

const URL = `https://11.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic kTy9gIdsz2317rA`;

const api = new API(URL, AUTHORIZATION);

const eventDestinationStore = new EventDestinationStore();
api.getDestinations().then((destinations) => {
  eventDestinationStore.setDestinations(destinations);
});

const eventOfferStore = new EventOfferStore();
api.getOffers().then((offers) => {
  eventOfferStore.setOffers(offers);
});

const tripEventStore = new TripEventStore(api);
api.getTripEvents().then((tripEvents) => {
  tripEventStore.setTripEvents(tripEvents);
  init();
});

const init = () => {
  const tripInfoController = new TripInfoController(tripMainElement, tripEventStore);
  const tripMenuController = new MenuController(tripMainElement, tripEventStore);
  const tripFilterController = new FilterController(headerFilterElement, tripEventStore);
  const tripBoardController = new TripBoardController(tripEventsElement, tripEventStore);
  const tripStatsController = new TripStatsController(tripEventsElement, tripEventStore);

  tripMenuController.setMenuTabActionController([MenuTab.TABLE, tripBoardController]);
  tripMenuController.setMenuTabActionController([MenuTab.STATS, tripStatsController]);
  tripInfoController.render();
  tripFilterController.render();
  tripMenuController.render();
};
