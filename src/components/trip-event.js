import AbstractComponent from "./abstract-component.js";
import {EventOffer as EventOfferComponent, OfferListType} from "./event-offer.js";
import {RollupBtn as RollupBtnComponent} from "./form/rollup-btn.js";
import {getShortFormatTime} from "../utils/util.js";

const createEventItemTemplate = (tripEvent) => {
  const {title, type, startDateTime, endDateTime, duration, price, offers} = tripEvent;
  const [startTime, endTime] = [getShortFormatTime(startDateTime), getShortFormatTime(endDateTime)];
  const offerList = new EventOfferComponent(offers, OfferListType.SHORT_TEXT_LIST).getTemplate();
  const rollupBtn = new RollupBtnComponent().getTemplate();

  return (`<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
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

export class TripEvent extends AbstractComponent {

  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return createEventItemTemplate(this._tripEvent);
  }

  setRollupBtnClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
  }
}
