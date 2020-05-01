import {render, RenderPosition} from "./utils/render.js";
import {TripInfo as TripInfoComponent} from "./components/trip-info.js";
import {getMenu} from "./data/menu.js";
import {Menu as MenuComponent} from "./components/menu.js";
import {getFilter} from "./data/filter.js";
import {Filter as FilterComponent} from "./components/filter.js";
import {getEvents} from "./data/trip-event.js";
import {TripController} from "./controllers/trip-controller.js";

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const headerMenuElement = tripControlElement.querySelector(`h2:first-child`);
const headerFilterElement = tripControlElement.querySelector(`h2:last-child`);

const tripEvents = getEvents();

render(tripMainElement, new TripInfoComponent(tripEvents), RenderPosition.AFTERBEGIN);
render(headerMenuElement, new MenuComponent(getMenu()), RenderPosition.AFTEREND);
render(headerFilterElement, new FilterComponent(getFilter()), RenderPosition.AFTEREND);

new TripController(tripEventsElement).render(tripEvents);
