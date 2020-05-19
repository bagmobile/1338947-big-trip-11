import AbstractComponent from "./abstract-component";

const createTripErrorTemplate = (type) => {
  return (`<p class="error-message" >${type}</p>`);
};

export default class TripErrorComponent extends AbstractComponent {

  constructor(type) {
    super();
    this._type = type;
  }

  getTemplate() {
    return createTripErrorTemplate(this._type);
  }

}
