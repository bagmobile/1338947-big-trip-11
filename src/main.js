import {TripBoardController} from "./controllers/trip-board-controller.js";
import TripEventsModel from "./models/trip-events-model.js";
import FilterController from "./controllers/filter-controller.js";
import MenuController from "./controllers/menu-controllers.js";
import {TripStatsController} from "./controllers/trip-stats-controller.js";
import {MenuTab} from "./config.js";
import TripInfoController from "./controllers/trip-info-controller.js";
import TripDestinationsModel from "./models/trip-destinations-model";
import {generateDestinations} from "./mock/event-mock.js";
import TripOffersModel from "./models/trip-offers-model";
import {generateEvents, generateTripOffers} from "./mock/event-mock";

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const headerFilterElement = tripControlElement.querySelector(`h2:last-child`);


const tripEventsModel = new TripEventsModel();
tripEventsModel.setTripEvents(generateEvents());
const tripDestinationsModel = new TripDestinationsModel();
tripDestinationsModel.setTripDestinations(generateDestinations());
const tripOffersModel = new TripOffersModel();
tripOffersModel.setTripOffers(generateTripOffers());


const tripInfoController = new TripInfoController(tripMainElement, tripEventsModel);
const tripMenuController = new MenuController(tripMainElement, tripEventsModel);
const tripFilterController = new FilterController(headerFilterElement, tripEventsModel);
const tripBoardController = new TripBoardController(tripEventsElement, tripEventsModel);
const tripStatsController = new TripStatsController(tripEventsElement, tripEventsModel);

tripMenuController.setMenuTabActionController([MenuTab.TABLE, tripBoardController]);
tripMenuController.setMenuTabActionController([MenuTab.STATS, tripStatsController]);

tripInfoController.render();
tripMenuController.render();
tripFilterController.render();
