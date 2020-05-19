import AbstractComponent from "./abstract-component";
import {getTripEventTypes, upperFirstChar} from "../utils/common";

const createEventTypeItemTemplate = (name, isChecked) => {
  const lowerName = upperFirstChar(name);
  const checked = isChecked ? `checked` : ``;

  return (`<div class="event__type-item">
    <input id="event-type-${name}-1"
    class="event__type-input  visually-hidden"
    type="radio"
    name="event-type"
    value="${name}"
    ${checked}>
    <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${lowerName}</label>
</div>`);
};

const createEventTypeListTemplate = (tripEvent, currentEventType) => {
  const [transportTypes, activityTypes] = getTripEventTypes();
  const createEventTypeItemHandler = (eventType) => createEventTypeItemTemplate(eventType, currentEventType === eventType);
  const transferList = transportTypes.map(createEventTypeItemHandler).join(`\n`);
  const activityList = activityTypes.map(createEventTypeItemHandler).join(`\n`);

  return (`<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${currentEventType}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    <div class="event__type-list">
        <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${transferList}
        </fieldset>
        <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${activityList}
        </fieldset>
    </div>
</div>`);
};

export class EventTypeComponent extends AbstractComponent {

  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._currentEventType = tripEvent.type;
    this._tripEventChangeEventHandler = null;
  }

  getTemplate() {
    return createEventTypeListTemplate(this._tripEvent, this._currentEventType);
  }

  setEventTypeChangeHandler(handler) {
    this.getElement().querySelectorAll(`.event__type-group`)
      .forEach((item) => item.addEventListener(`change`, (evt) => {
        const selectElement = evt.target;
        this._currentEventType = selectElement.value;
        this.rerender();
        handler(this._currentEventType);
      }));
    this._tripEventChangeEventHandler = handler;
  }

  recoveryListeners() {
    this.setEventTypeChangeHandler(this._tripEventChangeEventHandler);
  }
}
