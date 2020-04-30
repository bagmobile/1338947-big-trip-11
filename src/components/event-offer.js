import AbstractComponent from "./abstract-component.js";
import {MAX_COUNT_OFFER_SHOW} from "../config.js";
import {getEventOffers} from "../data/trip-event.js";

export const OfferListType = {
  SHORT_TEXT_LIST: `shortTextList`,
  CHECKED_OPTION_LIST: `fullOptionList`,
  AVAILABLE_OPTION_LIST: `availableOptionList`,
};

const createEventOfferItemTemplate = (offer) => {
  const {name, price} = offer;

  return (`<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
</li>
`);
};

export const createEventShortOfferListTemplate = (offers) => {
  const offerList = offers.slice(0, MAX_COUNT_OFFER_SHOW).map((offer) => createEventOfferItemTemplate(offer)).join(`\n`);

  return (`<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
    ${offerList}
</ul>`);
};

const createCheckedOfferItemTemplate = (offer) => {
  const {type, name, price, isChecked} = offer;
  const checked = isChecked ? `checked` : ``;

  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1"
           type="checkbox" name="event-offer-${type}" ${checked}>
    <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
</div>`);
};

const createAvailableOfferListTemplate = () => {
  const offerList = getEventOffers().map((offer) => createCheckedOfferItemTemplate(offer)).join(`\n`);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offerList}
    </div>
</section>`);
};

const createCheckedOfferListTemplate = (eventOffers) => {
  const offers = getEventOffers().map((offer) => {
    offer.isChecked = eventOffers.some((eventOffer) => eventOffer.type === offer.type);
    return offer;
  });
  const offerList = offers.map((offer) => createCheckedOfferItemTemplate(offer)).join(`\n`);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offerList}
    </div>
</section>`);
};

export class EventOffer extends AbstractComponent {

  constructor(eventOffers, type) {
    super();
    this._eventOffers = eventOffers;
    this._type = type;
  }

  getTemplate() {
    switch (this._type) {
      case OfferListType.SHORT_TEXT_LIST:
        return createEventShortOfferListTemplate(this._eventOffers);
      case OfferListType.CHECKED_OPTION_LIST:
        return createCheckedOfferListTemplate(this._eventOffers);
      case OfferListType.AVAILABLE_OPTION_LIST:
        return createAvailableOfferListTemplate();
      default:
        return ``;
    }
  }

}
