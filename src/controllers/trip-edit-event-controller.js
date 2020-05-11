import {TripEditEvent as TripEditEventComponent} from "../components/trip-edit-event.js";
import {remove, render, RenderPosition, replace} from "../utils/render.js";
import {isEscEvent} from "../utils/dom-utils.js";
import TripEventStore from "../models/trip-event-store.js";
import {TripEventModel} from "../models/trip-event-model.js";

export const ModeEditEvent = {
  NEW: `new`,
  UPDATE: `update`,
};

export default class TripEditEventController {

  constructor(tripEvent, mode, sourceComponent) {

    this._tripEvent = tripEvent;
    this._mode = mode;
    this._sourceComponent = sourceComponent;
    this._editEventComponent = new TripEditEventComponent(this._tripEvent, this._mode);
    this._tripEventsModel = new TripEventStore();

    this._closeEditEventHandelrs = [];

    this._onSubscribeOnEvents();

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  getComponent() {
    return this._editEventComponent;
  }

  render(container) {
    render(container, this._editEventComponent, RenderPosition.AFTERBEGIN);
  }

  setCloseEditEventFormHandler(handler) {
    this._closeEditEventHandelrs.push(handler);
  }

  _onSubscribeOnEvents() {

    this._editEventComponent.setSubmitHandler((mode) => {
      const tripEvent = this._editEventComponent.getData();

      switch (mode) {
        case ModeEditEvent.NEW:
          this._tripEventsModel.createTripEvent(new TripEventModel(tripEvent));
          this._close();
          break;
        case ModeEditEvent.UPDATE:
          this._tripEventsModel.updateTripEvent(this._tripEvent.id, new TripEventModel(tripEvent));
          break;
      }
    });

    this._editEventComponent.setRollupBtnClickHandler(() => {
      this._close();
    });

    this._editEventComponent.setDeleteBtnClickHandler(() => {
      this._tripEventsModel.deleteTripEvent(this._tripEvent.id);
    });

    this._editEventComponent.setCancelBtnClickHandler(() => {
      this._close();
    });

    this._editEventComponent.setFavoriteBtnClickHandler((iSFavoriteCurrent) => {
      const updatedTripEvent = Object.assign({}, this._tripEvent, {isFavorite: iSFavoriteCurrent});
      this._tripEvent.isFavorite = iSFavoriteCurrent;
      this._tripEventsModel.updateTripEvent(this._tripEvent.id, new TripEventModel(updatedTripEvent), true);
    });
  }

  _destroy() {
    remove(this._editEventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _close(isSelf = true) {
    if (this._sourceComponent) {
      replace(this._sourceComponent, this._editEventComponent);
    }
    this._destroy();
    this._callHandlers(this._closeEditEventHandelrs, isSelf);
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, () => {
      this._close();
    });
  }

  _callHandlers(handlers, isSelf) {
    handlers.forEach((handler) => handler(isSelf));
  }


}
