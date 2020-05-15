import {remove, render, RenderPosition} from "../utils/render";
import TripEventModel from "../models/trip-event-model";
import TripEventStore from "../models/trip-event-store";
import {TripEditEventComponent} from "../components/trip-edit-event-component";
import {isEscEvent} from "../utils/common";

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
    this._tripEventStore = new TripEventStore();

    this._closeEditEventHandelrs = [];

    this._onSubscribeOnEvents();

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  getComponent() {
    return this._editEventComponent;
  }

  getSourceComponent() {
    return this._sourceComponent;
  }

  render(container) {
    render(container, this._editEventComponent, RenderPosition.AFTEREND);
  }

  setCloseEditEventHandler(handler) {
    this._closeEditEventHandelrs.push(handler);
  }

  _onSubscribeOnEvents() {

    this._editEventComponent.setSubmitHandler((mode) => {
      const tripEvent = this._editEventComponent.getData();

      switch (mode) {
        case ModeEditEvent.NEW:
          this._tripEventStore.createTripEvent(new TripEventModel(tripEvent));
          this._close();
          break;
        case ModeEditEvent.UPDATE:
          this._tripEventStore.updateTripEvent(this._tripEvent.id, new TripEventModel(tripEvent));
          break;
      }
    });

    this._editEventComponent.setRollupBtnClickHandler(() => {
      this._close();
    });

    this._editEventComponent.setDeleteBtnClickHandler(() => {
      this._tripEventStore.deleteTripEvent(this._tripEvent.id);
    });

    this._editEventComponent.setCancelBtnClickHandler(() => {
      this._close();
    });

    this._editEventComponent.setFavoriteBtnClickHandler((isFavoriteCurrent) => {
      const updatedTripEvent = Object.assign({}, this._tripEvent, {isFavorite: isFavoriteCurrent});
      this._tripEvent.isFavorite = isFavoriteCurrent;
      this._tripEventStore.updateTripEvent(this._tripEvent.id, new TripEventModel(updatedTripEvent), true);
    });
  }

  destroyComponent() {
    remove(this._editEventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _close() {
    this._callHandlers(this._closeEditEventHandelrs);
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
