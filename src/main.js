import {render} from "./components/render-component";
// import {createTripInfoTemplate} from "./components/trip-info.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortTemplate} from "./components/sort.js";
import {/*  createEventListTemplate,  */ createDayEventListTemplate} from "./components/trip-event.js";
import {createEditEventTemplate} from "./components/trip-edit-event";
// import {getTripInfo} from "./data/trip-info";
import {getMenu} from "./data/menu";
import {getFilter} from "./data/filter";
import {getSort} from "./data/sort";
import {getEvents, prepareEventsByDays} from "./data/trip-event";

const events = getEvents();

// const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

// render(tripMainElement, createTripInfoTemplate(getTripInfo()), `afterbegin`);
render(tripControlElement.querySelector(`h2:first-child`), createMenuTemplate(getMenu()));
render(tripControlElement.querySelector(`h2:last-child`), createFilterTemplate(getFilter()));
render(tripEventsElement.querySelector(`h2:first-child`), createSortTemplate(getSort()));

// render(tripEventsElement, createEventListTemplate(events), `beforeend`);
render(tripEventsElement, createDayEventListTemplate(prepareEventsByDays(events)), `beforeend`);

render(tripEventsElement.querySelector(`.trip-events__item`), createEditEventTemplate(events[0]), `afterend`);
// render(tripEventsElement.querySelector(`.trip-events__item`), createEditEventTemplate(events[0]), `afterbegin`);
