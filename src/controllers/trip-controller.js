import {remove, render, RenderPosition} from "../utils/render.js";
import {TripNoEvent as TripNoEventElement} from "../components/trip-no-event.js";
import {Sort as SortComponent, SortType} from "../components/sort.js";
import {DayList as DayListComponent, DayListType} from "../components/day-list.js";
import PointController from "./point-controller.js";

const sortTypeToDayListTypeMap = new Map([
  [SortType.EVENT, DayListType.GROUP],
  [SortType.TIME, DayListType.ORDERED],
  [SortType.PRICE, DayListType.ORDERED],
]);

const renderTripEvents = (eventListElement, tripEvents, onDataChange, onViewChange) => {
  return tripEvents.map((tripEvent, index) => {
    const pointController = new PointController(eventListElement[index], onDataChange, onViewChange);

    pointController.render(tripEvent);

    return pointController;
  });
};

export class TripController {
  constructor(container) {
    this._container = container;
    this._tripEvents = [];
    this._showedPointControllers = [];
    this._currentDayListType = DayListType.GROUP;
    this._noTasksComponent = new TripNoEventElement();
    this._sortComponent = new SortComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tripEvents) {
    this._tripEvents = tripEvents;
    const headerTripEventElement = this._container.querySelector(`h2:first-child`);

    if (tripEvents.length === 0) {
      render(headerTripEventElement, this._noTasksComponent, RenderPosition.AFTEREND);
      return;
    }

    render(headerTripEventElement, this._sortComponent, RenderPosition.AFTEREND);

    this._dayListComponent = new DayListComponent(tripEvents, this._currentDayListType);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    const eventListElement = this._dayListComponent.getElement().querySelectorAll(`.trip-events__item`);
    this._showedPointControllers = renderTripEvents(eventListElement, tripEvents, this._onDataChange, this._onViewChange);

  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._tripEvents.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }
    this._tripEvents.splice(index, 1, newData);
    pointController.render(this._tripEvents[index]);
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = this._sortComponent.getSortedEvents(this._tripEvents, sortType);

    remove(this._dayListComponent);

    this._currentDayListType = sortTypeToDayListTypeMap.get(sortType);

    this.render(sortedEvents, this._onDataChange);
  }

}
