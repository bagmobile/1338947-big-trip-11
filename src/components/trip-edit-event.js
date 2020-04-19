import {getShortFormatDate} from "../util.js";
import {createElement} from "../dom-util.js";
import {TripTown as TripTownComponent} from "./trip-town.js";
import {EventType as EventTypeComponent} from "./event-type.js";
import {OfferListType, EventOffer as EventOfferComponent} from "./event-offer.js";
import {RollupBtn as RollupBtnComponent} from "./form/rollup-btn.js";
import {SaveBtn as SaveBtnComponent} from "./form/save-btn.js";
import {EventDestination as EventDestinationComponent} from "./event-destination.js";
import {DeleteBtn as DeleteBtnComponent} from "./form/delete-btn.js";
import {FavoriteBtn as FavoriteBtnComponent} from "./form/favorite-btn.js";

export const EventEditType = {
  EVENT_EDIT_NEW: 1,
  EVENT_EDIT_EXISTS: 2,
};

const createEditEventTemplate = (tripEvent) => {
  const {icon, startDateTime, endDateTime, price, offers, destination, isFavorite} = tripEvent;
  const startTime = getShortFormatDate(startDateTime);
  const endTime = getShortFormatDate(endDateTime);
  const tripTownList = new TripTownComponent(tripEvent).getTemplate();
  const eventTypeList = new EventTypeComponent(tripEvent).getTemplate();
  const offerList = new EventOfferComponent(offers, OfferListType.CURRENT_FULL_LIST).getTemplate();
  const rollupBtn = new RollupBtnComponent().getTemplate();
  const eventDestination = new EventDestinationComponent(destination).getTemplate();
  const saveBtn = new SaveBtnComponent().getTemplate();
  const deleteBtn = new DeleteBtnComponent().getTemplate();
  const favoriteBtn = new FavoriteBtnComponent(isFavorite).getTemplate();

  return (`<li class="trip-events__item">
                  <form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                        ${eventTypeList}
                      </div>
                        ${tripTownList}
                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                    ${saveBtn}
                    ${deleteBtn}
                    ${favoriteBtn}
                    ${rollupBtn}
                    </header>

                    <section class="event__details">
                    ${offerList}
                    ${eventDestination}
                    </section>
                  </form>
                </li>`);
};

export class EditEvent {

  constructor(tripEvent, type) {
    this._tripEvent = tripEvent;
    this._type = type;
    this._element = null;
  }

  getTemplate() {
    switch (this._type) {
      case EventEditType.EVENT_EDIT_NEW:
        return createEditEventTemplate(this._tripEvent);
      case EventEditType.EVENT_EDIT_EXISTS:
        return createEditEventTemplate(this._tripEvent);
      default:
        return ``;
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
