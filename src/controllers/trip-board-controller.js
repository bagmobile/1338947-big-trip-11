import {remove, render, RenderPosition} from "../utils/render.js";
import {TripNoEvent as TripNoEventComponent} from "../components/trip-no-event.js";
import {DayList as DayListComponent} from "../components/day-list.js";
import TripEventController from "./trip-event-controller.js";
import SortController from "./sort-controller.js";
import {SortType} from "../config.js";

export class TripBoardController {

  constructor(container, tripEventsModel) {

    this._container = container;
    this._tripEventsModel = tripEventsModel;

    this.activeTripEditEventController = null;

    this._tripNoEventComponent = new TripNoEventComponent();
    this._dayListComponent = null;

    this._sortController = new SortController(this._container, this._tripEventsModel);

    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventsModel.setDataChangeHandler(this._onDataChange);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._tripEventsModel.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._tripEventsModel.setFilterTypeChangeHandler(this._onFilterTypeChange);
  }

  render() {
    this._renderSort();
    this._rerenderTemplate();
    this._renderTripEventsList();
  }

  showBoard() {
    if (!this._tripEventsModel.isEmpty()) {
      this._dayListComponent.show();
      this._sortController.getSortComponent().show();
    } else {
      this._tripNoEventComponent.show();
    }
  }

  hideBoard() {
    this._dayListComponent.hide();
    this._sortController.getSortComponent().hide();
    this._tripNoEventComponent.hide();
  }

  setActiveTripEditEventController(controller) {
    if (controller === null) {
      this.activeTripEditEventController = controller;
      return;
    }
    if (this.activeTripEditEventController) {
      this.activeTripEditEventController._close(false);
    }
    this.activeTripEditEventController = controller;
  }

  _renderTripNoEvent() {
    render(this._container, this._tripNoEventComponent, RenderPosition.AFTEREND);
  }

  _renderSort() {
    this._sortController.render();
  }

  _renderTripEventsList() {
    const dayListType = DayListComponent.getType(this._sortController.getCurrentSortType());

    this._dayListComponent = new DayListComponent(this._tripEventsModel, dayListType);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _renderTripEvents() {
    const tripEvents = this._tripEventsModel.getTripEvents();
    const eventsListElement = this._dayListComponent.getElement().querySelectorAll(`.trip-events__item`);

    tripEvents.forEach((tripEvent, index) => {
      const tripEventController = new TripEventController(this, tripEvent);
      this._tripEventsModel.setRefreshTripEventHandler(tripEvent.id, tripEventController.refreshTripEventHandler);

      tripEventController.render(eventsListElement[index]);
    });
  }

  _rerenderTripEventList() {
    remove(this._dayListComponent);
    if (!this._tripEventsModel.isEmpty()) {
      this._renderTripEventsList();
    }
  }

  _rerenderTemplate() {
    if (this._tripEventsModel.isFirst()) {
      remove(this._tripNoEventComponent);
      this._renderSort();
    }
    if (this._tripEventsModel.isEmpty()) {
      this._renderTripNoEvent();
      remove(this._sortController.getSortComponent());
    }
  }

  _onSortTypeChange() {
    this._rerenderTripEventList();
  }

  _onFilterTypeChange() {
    if (this._sortController.getCurrentSortType() !== SortType.EVENT) {
      this._sortController.reset();
    }
    this._rerenderTripEventList();
  }

  _onDataChange() {
    this._rerenderTemplate();
    this._rerenderTripEventList();
  }

}
