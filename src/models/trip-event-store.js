import {FilterType, SortType} from "../config.js";
import {formatDatePeriod, formatShortDate} from "../utils/common.js";
import {TripEventModel} from "./trip-event-model.js";

export default class TripEventStore {

  constructor(api) {

    if (!TripEventStore.instance) {
      TripEventStore.instance = this;
      this._api = api;
      this._tripEvents = [];

      this._currentFilterType = FilterType.EVERYTHING;
      this._currentSortType = SortType.EVENT;

      this._dataChangeHandlers = [];
      this._refreshTripEventHandlers = new Map();
      this._filterTypeChangeHandlers = [];
      this._sortTypeChangeHandlers = [];
    }

    return TripEventStore.instance;
  }

  static parse(tripEvents) {
    return tripEvents.map((tripEvent) => TripEventModel.parse(tripEvent));
  }

  isEmpty() {
    return this._tripEvents.length === 0;
  }

  isFirst() {
    return this._tripEvents.length === 1;
  }

  getTripEvents() {
    const tripEvents = this.getTripEventsByFilter();
    return this.getTripEventsBySort(tripEvents);
  }

  setTripEvents(tripEvents) {
    this._tripEvents = this.getTripEventsBySort(tripEvents);
  }

  createTripEvent(newTripEvent) {
    this._api.createTripEvent(newTripEvent).then((tripEvent) => {
      this._tripEvents = [].concat(tripEvent, this._tripEvents);
      this._callHandlers(this._dataChangeHandlers);
    });
  }

  updateTripEvent(id, newTripEvent, isForced = false) {
    const index = this._tripEvents.findIndex((item) => item.id === id);

    this._api.updateTripEvent(id, newTripEvent).then((tripEvent) => {

      this._tripEvents.splice(index, 1, tripEvent);
      if (isForced) {
        this._callRefreshTripEventHandler(tripEvent);
        return;
      }
      this._callHandlers(this._dataChangeHandlers, tripEvent);
    });
  }

  deleteTripEvent(id) {
    const index = this._tripEvents.findIndex((item) => item.id === id);
    this._api.deleteTripEvent(id).then(() => {
      this._tripEvents.splice(index, 1);
      this._callHandlers(this._dataChangeHandlers);
    });
  }

  getGroupByDaysTripEvents() {
    const tripEvents = this.getTripEvents();
    let uniqueDays = [...tripEvents.reduce((acc, elem) => acc.add(formatShortDate(elem.startDateTime)), new Set())];
    return uniqueDays.reduce((acc, day, index) => {
      acc.push([{
        order: ++index,
        date: day,
      }, tripEvents.filter((evt) => formatShortDate(evt.startDateTime) === day)]);
      return acc;
    }, []);
  }

  setSort(sortType) {
    this._currentSortType = sortType;
    this._callHandlers(this._sortTypeChangeHandlers);
  }

  getTripEventsBySort(tripEvents) {

    switch (this._currentSortType) {
      case SortType.TIME:
        return tripEvents.sort(function (a, b) {
          return (new Date(b.endDateTime) - new Date(b.startDateTime)) - (new Date(a.endDateTime) - new Date(a.startDateTime));
        });
      case SortType.PRICE:
        return tripEvents.sort(function (a, b) {
          return (b.price - a.price);
        });
      default :
        return tripEvents.sort(function (a, b) {
          return new Date(a.startDateTime) - new Date(b.startDateTime);
        });
    }
  }

  setFilter(filterType) {
    this._currentFilterType = filterType;
    this._currentSortType = SortType.EVENT;
    this._callHandlers(this._filterTypeChangeHandlers);
  }

  getTripEventsByFilter() {
    switch (this._currentFilterType) {
      case FilterType.EVERYTHING:
        return this._tripEvents;
      case FilterType.FUTURE:
        return this.getFilterFuture();
      case FilterType.PAST:
        return this.getFilterPast();
      default:
        return this._tripEvents;
    }
  }

  getFilterFuture() {
    return this._tripEvents.filter((tripEvent) => new Date(tripEvent.startDateTime) >= new Date());
  }

  getFilterPast() {
    return this._tripEvents.filter((tripEvent) => new Date(tripEvent.startDateTime) < new Date());
  }

  getCost(tripEvents) {
    let sum = 0;
    tripEvents.forEach((item) => {
      sum += item.price + item.offers.reduce((acc, offer) => {
        acc += offer.price;
        return acc;
      }, 0);
    });
    return sum;
  }

  getPeriod(tripEvents) {
    if (tripEvents.length === 0) {
      return ``;
    }
    return formatDatePeriod(tripEvents[0].startDateTime, tripEvents[tripEvents.length - 1].endDateTime);
  }

  getTitle(tripEvents) {
    const TITLE_COUNT_DESTINATION_NAME = 3;
    const names = tripEvents.map((item) => item.destination.name);
    if (names.length === 0) {
      return ``;
    }
    const [first, last] = [names[0], names[names.length - 1]];
    if (names.length > TITLE_COUNT_DESTINATION_NAME) {
      return `${first} - ... - ${last}`;
    } else {
      return names.join(` - `);
    }
  }

  getTripInfo() {
    const tripEvents = this.getTripEventsByFilter();
    return {
      title: this.getTitle(tripEvents),
      period: this.getPeriod(tripEvents),
      cost: this.getCost(tripEvents),
    };
  }

  getAvailableFilterTypes() {
    return {
      [FilterType.EVERYTHING]: !this.isEmpty(),
      [FilterType.FUTURE]: this.getFilterFuture().length > 0,
      [FilterType.PAST]: this.getFilterPast().length > 0,
    };
  }

  setFilterTypeChangeHandler(handler) {
    this._filterTypeChangeHandlers.push(handler);
  }

  setSortTypeChangeHandler(handler) {
    this._sortTypeChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setRefreshTripEventHandler(key, handler) {
    this._refreshTripEventHandlers.set(key, handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _callRefreshTripEventHandler(tripEvent) {
    this._refreshTripEventHandlers.get(tripEvent.id)(tripEvent);
  }

}

