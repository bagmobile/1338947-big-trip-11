import {render} from "./render-component.js";
import {createTripEditEventTemplate} from "./trip-edit-event.js";
import {createEventFavoriteTemplate} from "./event-favorite";
import {createEventRollupBtnTemplate} from "./event-rollup-btn";
import {createEventDestinationTemplate} from "./event-destination";

const renderTripDayEditEventTemplate = (component, place) => {
  render(component, createTripEditEventTemplate(), place);
  const tripEventsItemElement = component.nextElementSibling.querySelector(`.event__header`);
  const tripEventsDetailElement = component.nextElementSibling.querySelector(`.event__details`);
  render(tripEventsItemElement, createEventFavoriteTemplate(), `beforeend`);
  render(tripEventsItemElement, createEventRollupBtnTemplate(), `beforeend`);
  render(tripEventsDetailElement, createEventDestinationTemplate(), `beforeend`);
};

export const createTripDayEditEventTemplate = (component, place) => {
  renderTripDayEditEventTemplate(component, place);
};

