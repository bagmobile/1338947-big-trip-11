import {replace} from "../utils/render";
import AbstractComponent from "../components/abstract-component";
import TripEditEventController from "./trip-edit-event-controller";
import TripInfoController from "./trip-info-controller";
import TripStatsController from "./trip-stats-controller";
import NewEventController from "./new-event-controller";
import MenuController from "./menu-controllers";
import FilterController from "./filter-controller";
import SortController from "./sort-controller";
import TripBoardController from "./trip-board-controller";


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

export default class MainController {

  constructor(tripEventStore) {

    if (!MainController.instance) {
      this._tripEventStore = tripEventStore || [];
      this._controllers = new Map();

      this._createNewEventHandlers = [];

      this._tripEditEventController = null;
      this._closeTripEditEventHandler = this._closeTripEditEventHandler.bind(this);
      this._openTripEditEventHandler = this._openTripEditEventHandler.bind(this);

      MainController.instance = this;
    }
    return MainController.instance;
  }

  init() {

    this._controllers.set(TripInfoController.name, new TripInfoController(tripMainElement));
    this._controllers.set(TripStatsController.name, new TripStatsController(tripEventsElement));
    this._controllers.set(NewEventController.name, new NewEventController(tripMainElement));
    this._controllers.set(MenuController.name, new MenuController(tripControlElement));
    this._controllers.set(FilterController.name, new FilterController(tripControlElement));
    this._controllers.set(SortController.name, new SortController(tripEventsElement));
    this._controllers.set(TripBoardController.name, new TripBoardController(tripEventsElement));

    this._controllers.forEach((controller) => {
      controller.render();
    });

    this.getController(MenuController.name).showTab();

    this._onSubscribeOnEvents();
  }

  getTripEventStore() {
    return this._tripEventStore;
  }

  getController(key) {
    return this._controllers.get(key);
  }

  setCreateNewEventHandler(handler) {
    this._createNewEventHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _onSubscribeOnEvents() {
    this.getController(NewEventController.name).getComponent().setNewEventBtnClickHandler(() => {
      this._callHandlers(this._createNewEventHandlers);
    });
  }

  _openTripEditEventHandler(tripEvent, mode, source, targetContainer) {

    if (this._tripEditEventController !== null) {
      this.closeTripEditEvent();
    }

    this._tripEditEventController = new TripEditEventController(tripEvent, mode, source);
    this._tripEditEventController.setCloseEditEventHandler(this._closeTripEditEventHandler);
    if (source instanceof AbstractComponent) {
      replace(this._tripEditEventController.getComponent(), source);
    } else {
      this._tripEditEventController.render(tripEventsElement.querySelector(targetContainer));
    }
  }

  closeTripEditEvent() {
    const tripEditEventComponent = this._tripEditEventController.getComponent();
    const tripEventSourceComponent = this._tripEditEventController.getSourceComponent();
    if (tripEventSourceComponent) {
      replace(tripEventSourceComponent, tripEditEventComponent);
    }
    this.getController(NewEventController.name).getComponent().getElement().removeAttribute(`disabled`);
    this._tripEditEventController.destroyComponent();
    this._tripEditEventController = null;
  }

  _closeTripEditEventHandler() {
    this.closeTripEditEvent();
  }

}
