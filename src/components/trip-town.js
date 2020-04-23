import AbstractComponent from "./abstract-component.js";
import {getEventTowns} from "../data/trip-event.js";

const createTripTownItemTemplate = (town) => {
  return (`<option value="${town}"></option>`);
};

const createTripTownListTemplate = (tripEvent) => {
  const towns = getEventTowns();
  towns.splice(towns.indexOf(tripEvent.town), 1);
  const townList = towns.map((town) => createTripTownItemTemplate(town));

  return (` <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${tripEvent.type} ${tripEvent.routePrefix}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripEvent.town}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${townList}
                        </datalist>
                      </div>`);
};

export class TripTown extends AbstractComponent {

  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return createTripTownListTemplate(this._tripEvent);
  }

}
