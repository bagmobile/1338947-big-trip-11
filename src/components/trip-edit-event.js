import {createAvailableOfferListTemplate} from "./event-offer";
import {createEventDestinationTemplate} from "./event-destination";
import {createSaveButtonTemplate} from "./form/save-btn";
import {createDeleteButtonTemplate} from "./form/delete-btn";
import {createFavoriteButtonTemplate} from "./form/favorite-btn";
import {createRollupBtnTemplate} from "./form/rollup-btn";
// import {createCancelButtonTemplate} from "./form/cancel-btn";
import {getEventTypes, getEventTowns} from "../data/trip-event";
import {getShortFormatDate} from "../util";

const createEventTypeItemTemplate = (name, isChecked) => {
  const lowerName = name.toLowerCase();
  const checked = isChecked ? `checked` : ``;
  return (`<div class="event__type-item">
    <input id="event-type-${lowerName}-1"
    class="event__type-input  visually-hidden"
    type="radio"
    name="event-type"
    value="${lowerName}"
    ${checked}>
    <label class="event__type-label  event__type-label--${lowerName}" for="event-type-${lowerName}-1">${name}</label>
</div>`);
};

const createEventTypeListTemplate = (event) => {
  const [transportTypes, activityTypes] = getEventTypes();
  const transferList = (transportTypes).map((typeEvent) => createEventTypeItemTemplate(typeEvent, event.type === typeEvent)).join(`\n`);
  const activityList = (activityTypes).map((typeEvent) => createEventTypeItemTemplate(typeEvent, event.type === typeEvent)).join(`\n`);
  return (`<div class="event__type-list">
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Transfer</legend>
                            ${transferList}
                            </fieldset>
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>
                            ${activityList}
                          </fieldset>
                        </div>`);
};

const createEventDestinationItemTemplate = (town) => {
  return (`<option value="${town}"></option>`);
};

const createEventDestinationListTemplate = (evt) => {
  const towns = getEventTowns();
  towns.splice(towns.indexOf(evt.town), 1);
  const destinationList = towns.map((town) => createEventDestinationItemTemplate(town));
  return (` <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${evt.type} ${evt.routePrefix}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${evt.town}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${destinationList}
                        </datalist>
                      </div>`);
};

export const createEditEventTemplate = (tripEvent) => {
  const {icon, startDateTime, endDateTime, price, offers, destination, isFavorite} = tripEvent;
  const start = getShortFormatDate(startDateTime);
  const end = getShortFormatDate(endDateTime);
  return (`<li class="trip-events__item">
                  <form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                        ${createEventTypeListTemplate(tripEvent)}
                      </div>

                        ${createEventDestinationListTemplate(tripEvent)}

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${start}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${end}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                    ${createSaveButtonTemplate()}
                    ${createDeleteButtonTemplate()}
                    ${createFavoriteButtonTemplate(isFavorite)}
                    ${createRollupBtnTemplate()}
                    </header>

                    <section class="event__details">
                    ${createAvailableOfferListTemplate(offers)}
                    ${createEventDestinationTemplate(destination)}
                    </section>
                  </form>
                </li>`);
};
