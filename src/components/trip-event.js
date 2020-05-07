import AbstractComponent from "./abstract-component.js";
import {getTitle} from "../data/trip-event.js";
import {EventOffer as EventOfferComponent, OfferListType} from "./event-offer.js";
import {RollupBtn as RollupBtnComponent} from "./form/rollup-btn.js";
import {durationDateTime, formatToShortTime} from "../utils/common.js";
import {createElement} from "../utils/render.js";
import TripOffersModel from "../models/trip-offers-model";

const createEventItemTemplate = (tripEvent) => {
  const {type, startDateTime, endDateTime, price} = tripEvent;
  const [title, startTime, endTime, duration] = [
    getTitle(tripEvent),
    formatToShortTime(startDateTime),
    formatToShortTime(endDateTime),
    durationDateTime(startDateTime, endDateTime),
  ];

  return (`<div class="event">
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
                    <h4 class="visually-hidden">Offers:</h4>

                  </div>
                </li>`);
};

export class TripEvent extends AbstractComponent {

  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._tripOffersModel = new TripOffersModel();
    this._rollupBtnComponent = new RollupBtnComponent();
    this._offerListComponent = new EventOfferComponent(this._tripEvent, this._tripOffersModel, OfferListType.SHORT_TEXT_LIST);
  }

  getTemplate() {
    return createEventItemTemplate(this._tripEvent);
  }

  setRollupBtnClickHandler(handler) {
    this._rollupBtnComponent.getElement().addEventListener(`click`, handler);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.append(this._rollupBtnComponent.getElement());
      this._element.querySelector(`.event__rollup-btn`).before(this._offerListComponent.getElement());
    }
    return this._element;
  }
}
