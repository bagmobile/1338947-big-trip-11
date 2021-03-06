import EventDestinationModel from "./event-destination-model";
import AbstractStore from "./abstract-store";

export default class EventDestinationStore extends AbstractStore {

  constructor(destinations) {
    super();
    if (!EventDestinationStore.instance) {
      this._destinations = destinations || [];
      EventDestinationStore.instance = this;
    }
    return EventDestinationStore.instance;
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

  static parse(destinations) {
    return destinations.map((destination) => new EventDestinationModel({
      name: destination[`name`],
      description: destination[`description`],
      pictures: destination[`pictures`],
    }));
  }

}
