import {remove, render, RenderPosition} from "../utils/render.js";
import {TripNoEvent as TripNoEventElement} from "../components/trip-no-event.js";
import {DayList as DayListComponent} from "../components/day-list.js";
import TripEventController from "./trip-event-controller.js";
import SortController from "./sort-controller.js";
import {SortType} from "../config.js";

export class TripBoardController {

  constructor(container, tripEventsModel) {

    this._container = container;
    this._tripEventsModel = tripEventsModel;

    this._noTasksComponent = new TripNoEventElement();
    this._dayListComponent = null;

    this._tripEventControllers = [];

    this._sortController = new SortController(this._container, this._tripEventsModel);

    //this._onDataChange = this._onDataChange.bind(this);
    //this._onViewChange = this._onViewChange.bind(this);

    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventsModel.setDataChangeHandler(this._onDataChange);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._tripEventsModel.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tripEventsModel.setFilterTypeChangeHandler(this._onFilterTypeChange);
  }

  render() {

    if (this._tripEventsModel.isEmpty()) {
      render(this._container, this._noTasksComponent, RenderPosition.AFTEREND);
      return;
    }

    this._renderSort();

    this._renderTripEventsList();
  }

  showBoard() {
    this._dayListComponent.show();
    this._sortController.getSortComponent().show();
    this._noTasksComponent.show();
  }

  hideBoard() {
    this._dayListComponent.hide();
    this._sortController.getSortComponent().hide();
    this._noTasksComponent.hide();
  }

  _rerenderBoard() {
    remove(this._dayListComponent);
    remove(this._sortController.getSortComponent());
    this.render();
  }

  _rerenderTripEventList() {
    remove(this._dayListComponent);
    this._renderTripEventsList();
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
      const tripEventController = new TripEventController(tripEvent);
      this._tripEventsModel.setRefreshTripEventHandler(tripEvent.id, tripEventController.refreshTripEventHandler);
      tripEventController.render(eventsListElement[index]);
      this._tripEventControllers.push(tripEventController);
    });
  }

  _onSortTypeChange() {
    remove(this._dayListComponent);
    this._renderTripEventsList();
  }

  _onFilterTypeChange() {
    if (this._sortController.getCurrentSortType() !== SortType.EVENT) {
      this._sortController.reset();
    }
    remove(this._dayListComponent);
    this._renderTripEventsList();
  }

  _onDataChange() {
    console.log(`dataChange`);
    this._rerenderTripEventList();
  }

}
