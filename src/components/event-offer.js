import AbstractComponent from "./abstract-component.js";
import {MAX_COUNT_OFFER_SHOW} from "../config.js";
import TripOffersModel from "../models/trip-offers-model.js";
import {EVENT_TYPE_DEFAULT} from "../data/trip-event";

export const OfferListType = {
  SHORT_TEXT_LIST: `shortTextList`,
  CHECKED_OPTION_LIST: `checkedOptionList`,
  AVAILABLE_OPTION_LIST: `availableOptionList`,
};

const createEventOfferItemTemplate = (offer) => {
  const {title, price} = offer;
  return (`<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
</li>
`);
};

export const createEventShortOfferListTemplate = (tripEvent) => {
  const offerList = tripEvent.offers.slice(0, MAX_COUNT_OFFER_SHOW).map((offer) => createEventOfferItemTemplate(offer)).join(`\n`);
  return (`<ul class="event__selected-offers">
    ${offerList}
</ul>`);
};

const createCheckedOfferItemTemplate = (offer) => {
  const {index, isChecked, data} = offer;
  const {title, price} = data;
  const checked = isChecked ? `checked` : ``;

  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}-1"
           type="checkbox" name="event-offer-${index}" ${checked}>
    <label class="event__offer-label" for="event-offer-${index}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
</div>`);
};

const createCheckedOfferListTemplate = (tripEvent, tripOffersModel) => {
  const offers = tripOffersModel.getCheckedTripOffers(tripEvent.type, tripEvent.offers);
  const offerList = offers.map((offer) => createCheckedOfferItemTemplate(offer)).join(`\n`);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offerList}
    </div>
</section>`);
};



const createAvailableOfferListTemplate = (tripOffersModel, eventType) => {
  const offers = tripOffersModel.getCheckedTripOffers(eventType, []);
  const offerList = offers.map((offer) => createCheckedOfferItemTemplate(offer)).join(`\n`);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offerList}
    </div>
</section>`);
};


export class EventOffer extends AbstractComponent {

  constructor(tripEvent, tripOffersModel, offerListType, newEventType = EVENT_TYPE_DEFAULT) {
    super();
    this._tripEvent = tripEvent;
    this._tripOffersModel = tripOffersModel;
    this._offerListType = offerListType;
    this._newEventType = newEventType;
  }

  getTemplate() {
    switch (this._offerListType) {
      case OfferListType.SHORT_TEXT_LIST:
        return createEventShortOfferListTemplate(this._tripEvent);
      case OfferListType.CHECKED_OPTION_LIST:
        return createCheckedOfferListTemplate(this._tripEvent, this._tripOffersModel);
      case OfferListType.AVAILABLE_OPTION_LIST:
        return createAvailableOfferListTemplate(this._tripOffersModel, this._newEventType);
      default:
        return ``;
    }
  }

}
