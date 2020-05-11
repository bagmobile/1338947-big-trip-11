import EventDestinationModel from "./event-destination-model";

export default class EventDestinationStore {

  constructor(destinations) {

    if (!EventDestinationStore.instance) {
      this._destinations = destinations || [];
      EventDestinationStore.instance = this;
    }
    return EventDestinationStore.instance;
  }

  static parse(destinations) {
    return destinations.map((destination) => new EventDestinationModel({
      name: destination[`name`],
      description: destination[`description`],
      pictures: destination[`pictures`],
    }));
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  hasDescription(name) {
    const destination = this.getDestination(name);
    return Boolean(destination.description) && destination.pictures.length !== 0;
  }

  getDestination(name) {
    const [destination] = this._destinations.filter((tripDestination) => tripDestination.name === name);
    return destination;
  }

  getNames() {
    const names = new Set();
    this._destinations.forEach((destination) => {
      names.add(destination.name);
    });
    return [...names];
  }

}
