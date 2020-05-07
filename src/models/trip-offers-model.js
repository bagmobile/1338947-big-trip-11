export default class TripOffersModel {

  constructor(tripOffers) {

    if (!TripOffersModel.instance) {
      this._tripOffers = tripOffers || [];
      TripOffersModel.instance = this;
    }
    return TripOffersModel.instance;
  }

  setTripOffers(tripOffers) {
    this._tripOffers = tripOffers;
  }

  getTripOffers(tripEventType) {
    const [tripOffersForType] = this._tripOffers
      .map((item) => item.type === tripEventType ? item.offers : false)
      .filter((item) => item);
    return tripOffersForType;
  }

  getCheckedTripOffers(tripEventType, tripEventOffers) {
    const tripOffersForType = this.getTripOffers(tripEventType);

    return tripOffersForType.map((tripOffer, index) => {
      return {
        index: `${tripEventType}_${index}`,
        isChecked: tripEventOffers.includes(tripOffer),
        data: tripOffersForType[index],
      };
    });
  }

}
