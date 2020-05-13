import AbstractComponent from "./abstract-component";

const createTripNoEventTemplate = () => {
  return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
};

export class TripNoEventComponent extends AbstractComponent {

  getTemplate() {
    return createTripNoEventTemplate();
  }

}

