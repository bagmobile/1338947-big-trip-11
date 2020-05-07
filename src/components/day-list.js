import AbstractComponent from "./abstract-component.js";
import {DayListType, SortType} from "../config.js";

const createDayListTemplate = (list) => {

  return (`<ul class="trip-days">
          ${list}
          </ul>`);
};

const createDayItemTemplate = (events, day = ``) => {

  return (`<li class="trip-days__item  day">
            <div class="day__info">
            ${day}
            </div>
            ${events}
          </li>`);
};

const createDayInfoTemplate = (day) => {
  const {order, date} = day;

  return (`<span class="day__counter">${order}</span>
                <time class="day__date" datetime="${date}">${date}</time>`);
};

const createEventItemTemplate = () => {
  return (`<li class="trip-events__item"></li>`);
};

const createEventListTemplate = (tripEvents) => {
  const eventList = tripEvents.map(() => createEventItemTemplate()).join(`\n`);

  return (`<ul class="trip-events__list">${eventList}</ul>`);
};

const getOrderedListTemplate = (tripEvents) => {
  const eventList = createDayItemTemplate(createEventListTemplate(tripEvents));

  return createDayListTemplate(eventList);
};

const getGroupByDayListTemplate = (batchTripEvents) => {
  const eventList = batchTripEvents.reduce((acc, tripEvents) => {
    const [day, events] = tripEvents;
    acc += createDayItemTemplate(createEventListTemplate(events), createDayInfoTemplate(day));
    return acc;
  }, ``);

  return createDayListTemplate(eventList);
};

export class DayList extends AbstractComponent {

  constructor(tripEventsModel, type) {
    super();
    this._tripEventsModel = tripEventsModel;
    this._type = type;
  }

  static getType(sortType) {
    const sortTypeToDayListTypeMap = new Map([
      [SortType.EVENT, DayListType.GROUPED],
      [SortType.TIME, DayListType.ORDERED],
      [SortType.PRICE, DayListType.ORDERED],
    ]);

    return sortTypeToDayListTypeMap.get(sortType);
  }

  getTemplate() {
    switch (this._type) {
      case DayListType.ORDERED:
        return getOrderedListTemplate(this._tripEventsModel.getTripEvents());
      case DayListType.GROUPED:
        return getGroupByDayListTemplate(this._tripEventsModel.getGroupByDaysTripEvents());
      default:
        return ``;
    }
  }

}
