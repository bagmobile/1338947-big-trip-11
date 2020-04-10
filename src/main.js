import {render} from "./components/render-component";
import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripMenuTemplate} from "./components/trip-menu.js";
import {createTripFilterTemplate} from "./components/trip-filter.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
import {createTripDayListTemplate} from "./components/trip-day.js";

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
render(tripControlElement.querySelector(`h2:first-child`), createTripMenuTemplate(), `afterend`);
render(tripControlElement.querySelector(`h2:last-child`), createTripFilterTemplate(), `afterend`);
render(tripEventsElement.querySelector(`h2:first-child`), createTripSortTemplate(), `afterend`);
render(tripEventsElement, createTripDayListTemplate());
