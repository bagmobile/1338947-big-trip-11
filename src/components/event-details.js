import AbstractComponent from "./abstract-component.js";
import {EventOffer as EventOfferComponent, OfferListType} from "./event-offer.js";

const createEventDetailsTemplate = (offers) => {
  const offerList = new EventOfferComponent(offers, OfferListType.FULL_OPTION_LIST).getTemplate();
  return (`<section class="event__details">
                    ${offerList}
                    </section>`);
};

export class EventDetails extends AbstractComponent {

  constructor(offers) {
    super();
    this._offers = offers;
  }

  getTemplate() {
    return createEventDetailsTemplate(this._offers);
  }
}
