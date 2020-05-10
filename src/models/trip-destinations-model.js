export default class TripDestinationsModel {

  constructor(tripDestinations) {

    if (!TripDestinationsModel.instance) {
      this._tripDestinations = tripDestinations || [];
      TripDestinationsModel.instance = this;
    }
    return TripDestinationsModel.instance;
  }

  setTripDestinations(tripDestinations) {
    this._tripDestinations = tripDestinations;
  }

  hasDescription(town) {
    const destination = this.getDestination(town);
    return Boolean(destination.description) && destination.photos.length !== 0;
  }

  getDestination(town) {
    const [destination] = this._tripDestinations.filter((tripDestination) => tripDestination.name === town);
    return destination;
  }

  getTowns() {
    const towns = new Set();
    this._tripDestinations.forEach((destination) => {
      towns.add(destination.name);
    });
    return [...towns];
  }

}
