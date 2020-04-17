import {createEventOfferListTemplate} from "./event-offer";
import {createRollupBtnTemplate} from "./form/rollup-btn";
import {getDayDateFormat, getShortFormatTime} from "../util";

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
  const {order, dateTime} = day;
  const date = getDayDateFormat(dateTime);

  return (`<span class="day__counter">${order}</span>
                <time class="day__date" datetime="${date}">${date}</time>`);
};

const createEventItem = (tripEvent) => {
  const {title, icon, startDateTime, endDateTime, duration, price, offers} = tripEvent;
  const [start, end] = [getShortFormatTime(startDateTime), getShortFormatTime(endDateTime)];

  return (`<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${title}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${startDateTime}">${start}</time>
                        &mdash;
                        <time class="event__end-time" datetime="${endDateTime}">${end}</time>
                      </p>
                      <p class="event__duration">${duration}</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>
                    ${createEventOfferListTemplate(offers)}
                    ${createRollupBtnTemplate()}
                  </div>
                </li>`);
};

const createEventList = (tripEvents) => {
  const list = tripEvents.map((tripEvent) => createEventItem(tripEvent)).join(`\n`);

  return (`<ul class="trip-events__list">
    ${list}
</ul>`);
};

export const createEventListTemplate = (tripEvents) => {
  const list = createDayItemTemplate(createEventList(tripEvents));

  return createDayListTemplate(list);
};

export const createDayEventListTemplate = (batchTripEvents) => {
  const list = batchTripEvents.reduce((acc, tripEvents) => {
    const [day, events] = tripEvents;
    acc += createDayItemTemplate(createEventList(events), createDayInfoTemplate(day));
    return acc;
  }, ``);

  return createDayListTemplate(list);
};
