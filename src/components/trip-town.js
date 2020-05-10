import {getRoute} from "../data/trip-event.js";
import AbstractComponent from "./abstract-component";

const createTripTownItemTemplate = (town) => {
  return (`<option value="${town}"></option>`);
};

const createTripTownListTemplate = (tripEvent, towns) => {
  const {type, destination} = tripEvent;
  const route = `${getRoute(type)}`;
  const townList = towns.map((town) => createTripTownItemTemplate(town));

  return (`<div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${route}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" required name="event-destination" value="${destination.name}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${townList}
                        </datalist>
                      </div>`);
};

export class TripTown extends AbstractComponent {

  constructor(tripEvent, tripDestinationsModel) {
    super();
    this._tripEvent = tripEvent;
    this._tripDestinationsModel = tripDestinationsModel;
    this._towns = tripDestinationsModel.getTowns();
    this._tripTownChangeHandler = null;
  }

  getTemplate(options) {
    return createTripTownListTemplate(this._tripEvent, this._towns, options);
  }

  updateRoute(eventType) {
    this.getElement().querySelector(`.event__type-output`).innerText = `${getRoute(eventType)}`;
  }

  setTripTownChangeHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const input = evt.target;
      input.setCustomValidity(``);
      if (!this._towns.includes(input.value)) {
        input.setCustomValidity(`Select destination from list`);
        input.select();
        return;
      }
      this._currentTown = evt.target.value;
      handler(this._currentTown);
    });
    this._tripTownChangeHandler = handler;
  }

  recoveryListeners() {
    this.setTripTownChangeHandler(this._tripTownChangeHandler);
  }
}
