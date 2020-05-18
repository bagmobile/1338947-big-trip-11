import {FilterType, SortType, TRIP_INFO_COUNT_DESTINATION_NAME} from "../config";
import {formatDatePeriod, formatShortDate} from "../utils/common";
import TripEventModel from "./trip-event-model";
import AbstractStore from "./abstract-store";


export default class TripEventStore extends AbstractStore {

  constructor(api) {
    super();

    if (!TripEventStore.instance) {
      TripEventStore.instance = this;
      this._api = api;
      this._tripEvents = new Map();

      this._currentFilterType = FilterType.EVERYTHING;
      this._currentSortType = SortType.EVENT;

      this._dataChangeHandlers = [];
      this._refreshTripEventHandlers = new Map();
      this._filterTypeChangeHandlers = [];
      this._sortTypeChangeHandlers = [];
      this._errorDataChangeHandlers = [];
      this._successDataChangeHandlers = [];
    }

    return TripEventStore.instance;
  }

  static parse(tripEvents) {
    return tripEvents.map((tripEvent) => TripEventModel.parse(tripEvent));
  }

  isEmpty() {
    return Array.from(this._tripEvents.values()).length === 0;
  }

  getTripEvents() {
    const tripEvents = this.getTripEventsByFilter();
    return this.getTripEventsBySort(tripEvents);
  }

  setTripEvents(tripEvents) {
    tripEvents.forEach((tripEvent) => {
      this._tripEvents.set(tripEvent.id, tripEvent);
    });
  }

  createTripEvent(newTripEvent) {
    this._api.createTripEvent(newTripEvent).then((tripEvent) => {
      this._tripEvents.set(tripEvent.id, tripEvent);
      this._callHandlers(this._successDataChangeHandlers);
      this._callHandlers(this._dataChangeHandlers);
    }).catch(() => {
      this._callHandlers(this._errorDataChangeHandlers);
    });
  }

  updateTripEvent(id, newTripEvent, isForced = false) {
    this._api.updateTripEvent(id, newTripEvent).then((tripEvent) => {
      this._tripEvents.set(tripEvent.id, tripEvent);
      this._callHandlers(this._successDataChangeHandlers, isForced);
      if (isForced) {
        this._callRefreshTripEventHandler(tripEvent);
        return;
      }
      this._callHandlers(this._dataChangeHandlers, tripEvent);
    }).catch(() => {
      this._callHandlers(this._errorDataChangeHandlers, isForced);
    });
  }

  deleteTripEvent(id) {
    this._api.deleteTripEvent(id).then(() => {
      this._tripEvents.delete(id);
      this._callHandlers(this._successDataChangeHandlers);
      this._callHandlers(this._dataChangeHandlers);
    }).catch(() => {
      this._callHandlers(this._errorDataChangeHandlers);
    });
  }

  getTripEventsGroupByDays() {
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

  setSort(sortType, isCallHandler = true) {
    this._currentSortType = sortType;
    if (isCallHandler) {
      this._callHandlers(this._sortTypeChangeHandlers);
    }
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

  setFilter(filterType, isCallHandler = true) {
    this._currentFilterType = filterType;
    this._currentSortType = SortType.EVENT;
    if (isCallHandler) {
      this._callHandlers(this._filterTypeChangeHandlers);
    }
  }

  getTripEventsByFilter() {
    switch (this._currentFilterType) {
      case FilterType.FUTURE:
        return this.getFilterFuture();
      case FilterType.PAST:
        return this.getFilterPast();
      default:
        return Array.from(this._tripEvents.values());
    }
  }

  getFilterFuture() {
    return Array.from(this._tripEvents.values()).filter((tripEvent) => new Date(tripEvent.startDateTime) >= new Date());
  }

  getFilterPast() {
    return Array.from(this._tripEvents.values()).filter((tripEvent) => new Date(tripEvent.endDateTime) < new Date());
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
    return this.isEmpty() ? `` : formatDatePeriod(tripEvents[0].startDateTime, tripEvents[tripEvents.length - 1].endDateTime);
  }

  getTitle(tripEvents) {
    const names = tripEvents.map((item) => item.destination.name);
    if (names.length === 0) {
      return ``;
    }
    const [first, last] = [names[0], names[names.length - 1]];
    if (names.length > TRIP_INFO_COUNT_DESTINATION_NAME) {
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

  setErrorDataChangeHandler(handler) {
    this._errorDataChangeHandlers.push(handler);
  }

  setSuccessDataChangeHandler(handler) {
    this._successDataChangeHandlers.push(handler);
  }

  removeSuccessDataChangeHandler() {
    this._successDataChangeHandlers = [];
  }

  removeErrorDataChangeHandler() {
    this._errorDataChangeHandlers = [];
  }

  setRefreshTripEventHandler(key, handler) {
    this._refreshTripEventHandlers.set(key, handler);
  }

  _callHandlers(handlers, ...arg) {
    handlers.forEach((handler) => handler(...arg));
  }

  _callRefreshTripEventHandler(tripEvent) {
    this._refreshTripEventHandlers.get(tripEvent.id)(tripEvent);
  }

}

