import {OfferListType, EventOffer as EventOfferComponent} from "./event-offer.js";
import {RollupBtn as RollupBtnComponent} from "./form/rollup-btn.js";
import {getShortFormatTime} from "../util.js";
import {createElement} from "../dom-util.js";

const createEventItemTemplate = (tripEvent) => {
  const {title, icon, startDateTime, endDateTime, duration, price, offers} = tripEvent;
  const [startTime, endTime] = [getShortFormatTime(startDateTime), getShortFormatTime(endDateTime)];
  const offerList = new EventOfferComponent(offers, OfferListType.SHORT_TEXT_LIST).getTemplate();
  const rollupBtn = new RollupBtnComponent().getTemplate();

  return (`<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${title}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${startDateTime}">${startTime}</time>
                        &mdash;
                        <time class="event__end-time" datetime="${endDateTime}">${endTime}</time>
                      </p>
                      <p class="event__duration">${duration}</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>
                    ${offerList}
                    ${rollupBtn}
                  </div>
                </li>`);
};

export class TripEvent {

  constructor(tripEvent) {
    this._tripEvent = tripEvent;
    this._element = null;
  }

  getTemplate() {
    return createEventItemTemplate(this._tripEvent);
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
