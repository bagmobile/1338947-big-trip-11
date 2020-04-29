import {TripEvent as TripEventComponent} from "../components/trip-event.js";
import {EditEvent as EditEventComponent} from "../components/trip-edit-event.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {isEscEvent} from "../utils/dom-util.js";
import {TripNoEvent as TripNoEventElement} from "../components/trip-no-event.js";
import {Sort as SortComponent} from "../components/sort.js";
import {DayList as DayListComponent, DayListType} from "../components/day-list.js";
import {remove} from "../utils/render";
import {SortType} from "../components/sort";

const sortTypeToDayListTypeMap = new Map([
  [SortType.EVENT, DayListType.GROUP],
  [SortType.TIME, DayListType.ORDERED],
  [SortType.PRICE, DayListType.ORDERED],
]);

export class TripController {
  constructor(container) {
    this._container = container;

    this._currentDayListType = DayListType.GROUP;
    this._noTasksComponent = new TripNoEventElement();
    this._sortComponent = new SortComponent();
  }

  render(tripEvents) {
    this.renderTripEventList(tripEvents);
  }

  renderTripEventItem(container, tripEvent) {
    const eventItemComponent = new TripEventComponent(tripEvent);
    const editEventComponent = new EditEventComponent(tripEvent);

    const replaceEventToEdit = () => {
      replace(editEventComponent, eventItemComponent);
    };

    const replaceEditToEvent = () => {
      replace(eventItemComponent, editEventComponent);
    };

    const onEscKeyDown = (evt) => {
      isEscEvent(evt, () => {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    };

    editEventComponent.setSubmitHandler(() => {
      replaceEditToEvent();
    });

    eventItemComponent.setRollupBtnClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editEventComponent.setRollupBtnClickHandler(() => {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });


    render(container, eventItemComponent, RenderPosition.AFTERBEGIN);
  }

  renderTripEventList(tripEvents) {
    const headerTripEventElement = this._container.querySelector(`h2:first-child`);

    if (tripEvents.length === 0) {
      render(headerTripEventElement, this._noTasksComponent, RenderPosition.AFTEREND);
      return;
    }

    render(headerTripEventElement, this._sortComponent, RenderPosition.AFTEREND);

    this._dayListComponent = new DayListComponent(tripEvents, this._currentDayListType);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    const tripEventItemElements = this._container.querySelectorAll(`.trip-events__item`);
    tripEvents.forEach((tripEvent, index) => this.renderTripEventItem(tripEventItemElements[index], tripEvent));

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = this._sortComponent.getSortedEvents(tripEvents, sortType);

      remove(this._sortComponent);
      remove(this._dayListComponent);

      this._currentDayListType = sortTypeToDayListTypeMap.get(sortType);

      this.render(sortedEvents);
    });
  }
}
