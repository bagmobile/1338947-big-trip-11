import {MAX_COUNT_OFFER_SHOW} from "../config";
import {getEventOffers} from "../data/trip-event";

const createEventOfferItemTemplate = (offer) => {
  const {name, price} = offer;

  return (`<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
</li>
`);
};

export const createEventOfferListTemplate = (offers) => {
  const items = offers.slice(0, MAX_COUNT_OFFER_SHOW).map((offer) => createEventOfferItemTemplate(offer)).join(`\n`);

  return (`<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
    ${items}
</ul>`);
};

const createAvailableOfferTemplate = (offer) => {
  const {type, name, price, checked} = offer;
  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1"
           type="checkbox" name="event-offer-${type}" ${checked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
</div>`);
};

export const createAvailableOfferListTemplate = (eventOffers) => {
  const offers = getEventOffers().map((offer) => {
    offer.checked = eventOffers.some((eventOffer) => eventOffer.type === offer.type);
    return offer;
  });
  const list = offers.map((offer) => createAvailableOfferTemplate(offer)).join(`\n`);

  return (eventOffers.length !== 0)
    ? (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${list}
    </div>
</section>`)
    : ``;
};
