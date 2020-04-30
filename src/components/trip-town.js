import AbstractComponent from "./abstract-component.js";
import {getEventTowns, getRoutePrefix} from "../data/trip-event.js";
import * as util from "../utils/utils.js";

const createTripTownItemTemplate = (town) => {
  return (`<option value="${town}"></option>`);
};

const createTripTownListTemplate = (tripEvent, options) => {
  const {currentEventType, currentTown} = options;
  const route = `${util.upFirst(currentEventType)} ${getRoutePrefix(currentEventType)}`;
  const towns = getEventTowns();
  towns.slice().splice(towns.indexOf(currentTown), 1);
  const townList = towns.map((town) => createTripTownItemTemplate(town));

  return (` <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${route}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentTown}" list="destination-list-1">
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

  getTemplate(options) {
    return createTripTownListTemplate(this._tripEvent, options);
  }

}
