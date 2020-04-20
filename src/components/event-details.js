import {createElement} from "../dom-util.js";
import {EventOffer as EventOfferComponent, OfferListType} from "./event-offer.js";

const createEventDetailsTemplate = (offers) => {
  const offerList = new EventOfferComponent(offers, OfferListType.FULL_OPTION_LIST).getTemplate();
  return (`<section class="event__details">
                    ${offerList}
                    </section>`);
};

export class EventDetails {

  constructor(offers) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createEventDetailsTemplate(this._offers);
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
