import {render as renderComponent, isEscEvent, RenderPosition} from "./dom-util.js";
import {getTripInfo} from "./data/trip-info.js";
import {TripInfo as TripInfoComponent} from "./components/trip-info.js";
import {getMenu} from "./data/menu.js";
import {Menu as MenuComponent} from "./components/menu.js";
import {getFilter} from "./data/filter.js";
import {Filter as FilterComponent} from "./components/filter.js";
import {getSort} from "./data/sort.js";
import {Sort as SortComponent} from "./components/sort.js";
import {getEvents, prepareEventsByDays} from "./data/trip-event.js";
import {TripEvent as TripEventComponent} from "./components/trip-event.js";
import {TripNoEvent as TripNoEventElement} from "./components/trip-no-event";
import {TripDayListType, TripDay as TripDayComponent} from "./components/trip-day.js";
import {EditEvent as EditEventComponent} from "./components/trip-edit-event.js";


const events = getEvents();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const headerMenuElement = tripControlElement.querySelector(`h2:first-child`);
const headerFilterElement = tripControlElement.querySelector(`h2:last-child`);
const headerTripEventElement = tripEventsElement.querySelector(`h2:first-child`);


renderComponent(tripMainElement, new TripInfoComponent(getTripInfo(events)).getElement(), RenderPosition.AFTERBEGIN);
renderComponent(headerMenuElement, new MenuComponent(getMenu()).getElement(), RenderPosition.AFTEREND);
renderComponent(headerFilterElement, new FilterComponent(getFilter()).getElement(), RenderPosition.AFTEREND);

const renderTripEventItem = (container, tripEvent) => {
  const eventItemComponent = new TripEventComponent(tripEvent).getElement();
  const editEventComponent = new EditEventComponent(tripEvent).getElement();

  editEventComponent.querySelector(`form`).addEventListener(`submit`, () => {
    replaceEditToEvent();
  });

  const replaceEventToEdit = () => {
    container.replaceChild(editEventComponent, eventItemComponent);
  };

  const replaceEditToEvent = () => {
    container.replaceChild(eventItemComponent, editEventComponent);
  };

  const onEscKeyDown = (evt) => {
    isEscEvent(evt, () => {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  };

  const rollupBtn = eventItemComponent.querySelector(`.event__rollup-btn`);
  rollupBtn.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  renderComponent(container, eventItemComponent, RenderPosition.AFTERBEGIN);
};

const renderTripEventList = (tripEvents) => {
  if (tripEvents.length === 0) {
    renderComponent(headerTripEventElement, new TripNoEventElement().getElement(), RenderPosition.AFTEREND);
    return;
  }
  renderComponent(headerTripEventElement, new SortComponent(getSort()).getElement(), RenderPosition.AFTEREND);
  renderComponent(tripEventsElement, new TripDayComponent(prepareEventsByDays(tripEvents), TripDayListType.LIST_GROUP).getElement(), RenderPosition.BEFOREEND);

  const tripEventItemElements = tripEventsElement.querySelectorAll(`.trip-events__item`);
  tripEventItemElements.forEach((tripEventItemElement, index) => renderTripEventItem(tripEventItemElement, tripEvents[index]));
};

renderTripEventList(events);
