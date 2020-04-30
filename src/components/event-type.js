import AbstractComponent from "./abstract-component.js";
import {getEventTypes} from "../data/trip-event.js";
import * as util from "../utils/utils.js";

const createEventTypeItemTemplate = (name, isChecked) => {
  const lowerName = util.upFirst(name);
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

const createEventTypeListTemplate = (tripEvent, options) => {
  const {currentEventType} = options;
  const [transportTypes, activityTypes] = getEventTypes();
  const createEventTypeItemHandler = (eventType) => createEventTypeItemTemplate(eventType, currentEventType === eventType);
  const transferList = transportTypes.map(createEventTypeItemHandler).join(`\n`);
  const activityList = activityTypes.map(createEventTypeItemHandler).join(`\n`);

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

  getTemplate(options) {
    return createEventTypeListTemplate(this._tripEvent, options);
  }

}
