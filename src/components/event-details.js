import AbstractComponent from "./abstract-component.js";
import {EventOffer as EventOfferComponent, OfferListType} from "./event-offer.js";
import {EventDestination} from "./event-destination.js";

const createEventDetailsTemplate = (tripEvent, options) => {
  const {isTownChanged, isEventTypeChanged} = options;
  const {offers, destination} = tripEvent;
  const offerList = new EventOfferComponent(offers, isEventTypeChanged ? OfferListType.AVAILABLE_OPTION_LIST : OfferListType.CHECKED_OPTION_LIST)
    .getTemplate();
  const eventDestination = isTownChanged ? new EventDestination(destination).getTemplate() : ``;

  return (`<section class="event__details">
                    ${offerList}
                    ${eventDestination}
                    </section>`);
};

export class EventDetails extends AbstractComponent {

  constructor(offers) {
    super();
    this._offers = offers;
  }

  getTemplate(options) {
    return createEventDetailsTemplate(this._offers, options);
  }
}
