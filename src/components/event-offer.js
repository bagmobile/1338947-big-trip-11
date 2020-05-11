import AbstractComponent from "./abstract-component.js";
import {MAX_COUNT_OFFER_SHOW} from "../config.js";

export const OfferListType = {
  SHORT_TEXT_LIST: `shortTextList`,
  CHECKED_OPTION_LIST: `checkedOptionList`,
  AVAILABLE_OPTION_LIST: `availableOptionList`,
};

const createItemTemplate = (offer) => {
  const {title, price} = offer;

  return (`<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
</li>
`);
};

export const createShortOffersListTemplate = (offers) => {
  const offerList = offers.map((offer) => createItemTemplate(offer)).join(`\n`);

  return (`<ul class="event__selected-offers">
    ${offerList}
</ul>`);
};

const createSelectedOfferItemTemplate = (offer) => {
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

const createSelectedOffersListTemplate = (offers) => {
  const offerList = offers.map((offer) => createSelectedOfferItemTemplate(offer)).join(`\n`);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offerList}
    </div>
</section>`);
};

const createAvailableOffersListTemplate = (offers) => {
  const offerList = offers.map((offer) => createSelectedOfferItemTemplate(offer)).join(`\n`);

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offerList}
    </div>
</section>`);
};

export class EventOffer extends AbstractComponent {

  constructor(tripEvent, eventOfferStore, offerListType, newEventType) {
    super();
    this._tripEvent = tripEvent;
    this._eventOfferStore = eventOfferStore;
    this._offerListType = offerListType;
    this._newEventType = newEventType;
  }

  getTemplate() {
    switch (this._offerListType) {
      case OfferListType.SHORT_TEXT_LIST:
        const shortListOffers = this._tripEvent.offers.slice(0, MAX_COUNT_OFFER_SHOW);
        return createShortOffersListTemplate(shortListOffers);
      case OfferListType.CHECKED_OPTION_LIST:
        const selectedOffers = this._eventOfferStore.getSelectedOffers(this._tripEvent.type, this._tripEvent.offers);

        return createSelectedOffersListTemplate(selectedOffers);
      case OfferListType.AVAILABLE_OPTION_LIST:
        const availableOffers = this._eventOfferStore.getSelectedOffers(this._tripEvent.type, []);
        return createAvailableOffersListTemplate(availableOffers, this._newEventType);
      default:
        return ``;
    }
  }

}
