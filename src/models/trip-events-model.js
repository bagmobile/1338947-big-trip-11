import {FilterType, SortType} from "../config.js";
import {formatShortDate} from "../utils/common.js";
import {formatDatePeriod} from "../utils/common";

export default class TripEventsModel {

  constructor() {

    if (!TripEventsModel.instance) {
      TripEventsModel.instance = this;

      this._tripEvents = [];

      this._currentFilterType = FilterType.EVERYTHING;
      this._currentSortType = SortType.EVENT;

      this._dataChangeHandlers = [];
      this._refreshTripEventHandlers = new Map();
      this._filterTypeChangeHandlers = [];
      this._sortTypeChangeHandlers = [];
    }

    return TripEventsModel.instance;
  }

  isEmpty() {
    return this._tripEvents.length === 0;
  }

  getTripEvents() {
    const tripEvents = this.getTripEventsByFilter();
    return this.getTripEventsBySort(tripEvents);
  }

  setTripEvents(tripEvents) {
    this._tripEvents = this.getTripEventsBySort(tripEvents);
    this._callHandlers(this._dataChangeHandlers);
  }

  createTripEvent(tripEvent) {
    this._tripEvents = [].concat(tripEvent, this._tripEvents);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateTripEvent(id, tripEvent, isForced = false) {
    const index = this._tripEvents.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._tripEvents.splice(index, 1, tripEvent);

    if (isForced) {
      this._callRefreshTripEventHandler(tripEvent);
      return true;
    }

    this._callHandlers(this._dataChangeHandlers, tripEvent);
    return true;
  }

  deleteTripEvent(id) {
    const index = this._tripEvents.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }
    this._tripEvents.splice(index, 1);
    this._callHandlers(this._dataChangeHandlers);
    return true;
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
    const TITLE_COUNT_TOWN = 3;
    const towns = tripEvents.map((item) => item.destination.name);
    if (towns.length === 0) {
      return ``;
    }
    const [first, last] = [towns[0], towns[towns.length - 1]];
    if (towns.length > TITLE_COUNT_TOWN) {
      return `${first} - ... - ${last}`;
    } else {
      return towns.join(` - `);
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

  setFilterTypeChangeHandler(handler) {
    this._filterTypeChangeHandlers.push(handler);
  }

  getAvailableFilterTypes() {
    return {
      [FilterType.EVERYTHING]: !this.isEmpty(),
      [FilterType.FUTURE]: this.getFilterFuture().length > 0,
      [FilterType.PAST]: this.getFilterPast(). length > 0,
    };
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
