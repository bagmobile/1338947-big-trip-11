import {remove, render, RenderPosition} from "../utils/render";
import TripEventController from "./trip-event-controller";
import {DayListComponent} from "../components/day-list-component";
import {TripNoEventComponent} from "../components/trip-no-event-component";
import MainController from "./main-controller";
import SortController from "./sort-controller";

export default class TripBoardController {

  constructor(container) {

    this._container = container;
    this._mainController = new MainController();
    this._tripEventStore = this._mainController.getTripEventStore();

    this._tripNoEventComponent = new TripNoEventComponent();
    this._dayListComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventStore.setDataChangeHandler(this._onDataChange);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._tripEventStore.setSortTypeChangeHandler(this._onSortTypeChange);

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._tripEventStore.setFilterTypeChangeHandler(this._onFilterTypeChange);

    this._onCreateNewTripEvent = this._onCreateNewTripEvent.bind(this);
    this._mainController.setCreateNewEventHandler(this._onCreateNewTripEvent);
  }

  render() {
    this._resetTripNoEvent();
    this._renderTripEventsList();
  }

  _resetTripNoEvent() {
    remove(this._tripNoEventComponent);
    if (this._tripEventStore.isEmpty()) {
      render(this._container, this._tripNoEventComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderTripEventsList() {
    const dayListType = DayListComponent.getType(this._mainController.getController(SortController.name).getComponent().getCurrentSortType());
    this._dayListComponent = new DayListComponent(this._tripEventStore, dayListType);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _renderTripEvents() {
    const tripEvents = this._tripEventStore.getTripEvents();
    const eventsListElement = this._dayListComponent.getEventItemElements();

    tripEvents.forEach((tripEvent, index) => {
      const tripEventController = new TripEventController(this, tripEvent);
      this._tripEventStore.setRefreshTripEventHandler(tripEvent.id, tripEventController.refreshTripEventHandler);
      tripEventController.render(eventsListElement[index]);
    });
  }

  _rerenderTripEventList() {
    remove(this._dayListComponent);
    if (!this._tripEventStore.isEmpty()) {
      this._renderTripEventsList();
    }
  }

  _onSortTypeChange() {
    this._rerenderTripEventList();
  }

  _onFilterTypeChange() {
    this._rerenderTripEventList();
  }

  _onDataChange() {
    this._resetTripNoEvent();
    this._rerenderTripEventList();
  }

  _onCreateNewTripEvent() {
    this._rerenderTripEventList();
  }

}
