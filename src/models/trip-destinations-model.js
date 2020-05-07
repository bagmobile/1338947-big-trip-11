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

  getTripDestinations() {
    return this._tripDestinations;
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
