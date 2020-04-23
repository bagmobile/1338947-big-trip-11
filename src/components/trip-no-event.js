import AbstractComponent from "./abstract-component.js";

const createTripNoEventTemplate = () => {
  return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
};

export class TripNoEvent extends AbstractComponent {

  getTemplate() {
    return createTripNoEventTemplate();
  }

}

