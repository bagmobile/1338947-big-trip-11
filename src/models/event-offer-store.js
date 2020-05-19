import EventOfferModel from "./event-offer-model";
import AbstractStore from "./abstract-store";

export default class EventOfferStore extends AbstractStore {

  constructor(offers) {
    super();
    if (!EventOfferStore.instance) {
      this._offers = offers || [];
      EventOfferStore.instance = this;
    }
    return EventOfferStore.instance;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffersForType(type) {
    const [offersForType] = this._offers
      .map((item) => item.type === type ? item.offers : false)
      .filter((item) => item);
    return offersForType || [];
  }

  hasOffers(type) {
    return this.getOffersForType(type).length !== 0;
  }

  getSelectedOffers(type, offers) {
    const offersForType = this.getOffersForType(type);

    return offersForType.map((offer, index) => {
      return {
        index: `${type}_${index}`,
        isChecked: offers.some((item) => {
          return JSON.stringify(item) === JSON.stringify(offer);
        }),
        data: offersForType[index],
      };
    });
  }

  static parse(offers) {
    return offers.map((offer) => {
      return new EventOfferModel({
        type: offer[`type`],
        offers: offer[`offers`],
      });
    });
  }

}
