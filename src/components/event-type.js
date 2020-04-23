import AbstractComponent from "./abstract-component.js";
import {getEventTypes} from "../data/trip-event.js";

const createEventTypeItemTemplate = (name, isChecked) => {
  const lowerName = name.toLowerCase();
  const checked = isChecked ? `checked` : ``;

  return (`<div class="event__type-item">
    <input id="event-type-${lowerName}-1"
    class="event__type-input  visually-hidden"
    type="radio"
    name="event-type"
    value="${lowerName}"
    ${checked}>
    <label class="event__type-label  event__type-label--${lowerName}" for="event-type-${lowerName}-1">${name}</label>
</div>`);
};

const createEventTypeListTemplate = (tripEvent) => {
  const [transportTypes, activityTypes] = getEventTypes();
  const transferList = (transportTypes).map((eventType) => createEventTypeItemTemplate(eventType, tripEvent.type === eventType)).join(`\n`);
  const activityList = (activityTypes).map((eventType) => createEventTypeItemTemplate(eventType, tripEvent.type === eventType)).join(`\n`);

  return (`<div class="event__type-list">
    <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transferList}
    </fieldset>
    <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${activityList}
    </fieldset>
</div>
`);
};

export class EventType extends AbstractComponent {

  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return createEventTypeListTemplate(this._tripEvent);
  }

}
