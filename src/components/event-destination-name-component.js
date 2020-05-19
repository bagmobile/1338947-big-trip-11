import AbstractComponent from "./abstract-component";
import EventDestinationStore from "../models/event-destination-store";

const createNameItemTemplate = (name) => {
  return (`<option value="${name}"></option>`);
};

const createNamesListTemplate = (tripEvent, names) => {
  const {type, destination} = tripEvent;
  const route = `${tripEvent.getRoute(type)}`;
  const namesList = names.map((name) => createNameItemTemplate(name));

  return (`<div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${route}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" required name="event-destination" value="${destination.name}" list="destination-list-1" autocomplete="off">
                        <datalist id="destination-list-1">
                          ${namesList}
                        </datalist>
                      </div>`);
};

export class EventDestinationNameComponent extends AbstractComponent {

  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._eventDestinationStore = new EventDestinationStore();
    this._names = this._eventDestinationStore.getNames();
    this._eventDestinationNameChangeHandler = null;
  }

  getTemplate(options) {
    return createNamesListTemplate(this._tripEvent, this._names, options);
  }

  updateRoute(tripEventType) {
    this.getElement().querySelector(`.event__type-output`).innerText = `${this._tripEvent.getRoute(tripEventType)}`;
  }

  setEventDestinationNameChangeHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const input = evt.target;
      input.setCustomValidity(``);
      if (!this._names.includes(input.value)) {
        input.setCustomValidity(`Select destination from list`);
        input.select();
        return;
      }
      this._currentName = input.value;
      handler(this._currentName);
    });
    this._eventDestinationNameChangeHandler = handler;
  }

  recoveryListeners() {
    this.setEventDestinationNameChangeHandler(this._eventDestinationNameChangeHandler);
  }
}
