import {remove, render, RenderPosition} from "../utils/render";
import TripEventModel from "../models/trip-event-model";
import TripEventStore from "../models/trip-event-store";
import {TripEditEventComponent} from "../components/trip-edit-event-component";
import {lockFormTrigger, onEscEvent, setButtonsWaitingTrigger, shake, toggleFormErrorStyle} from "../utils/common";
import {TripEventOperation} from "../config";

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

    this._onErrorDataChangeHandler = this._onErrorDataChangeHandler.bind(this);
    this._tripEventStore.setErrorDataChangeHandler(this._onErrorDataChangeHandler);

    this._onSuccessDataChangeHandler = this._onSuccessDataChangeHandler.bind(this);
    this._tripEventStore.setSuccessDataChangeHandler(this._onSuccessDataChangeHandler);

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

  destroyComponent() {
    remove(this._editEventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._tripEventStore.removeErrorDataChangeHandler();
    this._tripEventStore.removeSuccessDataChangeHandler();
  }

  setCloseEditEventHandler(handler) {
    this._closeEditEventHandelrs.push(handler);
  }

  _updateFormTrigger(form, tripEventOperation) {
    lockFormTrigger(form);
    setButtonsWaitingTrigger(form, tripEventOperation);
  }

  _onSubscribeOnEvents() {

    this._editEventComponent.setSubmitHandler((mode) => {
      const tripEvent = this._editEventComponent.getData();
      this._updateFormTrigger(this._editEventComponent.getElement(), TripEventOperation.SAVE);
      toggleFormErrorStyle(this._editEventComponent.getElement(), false);

      switch (mode) {
        case ModeEditEvent.NEW:
          this._tripEventStore.createTripEvent(new TripEventModel(tripEvent));
          break;
        case ModeEditEvent.UPDATE:
          this._tripEventStore.updateTripEvent(this._tripEvent.id, new TripEventModel(tripEvent));
          break;
      }
    });

    this._editEventComponent.setDeleteBtnClickHandler(() => {
      this._updateFormTrigger(this._editEventComponent.getElement(), TripEventOperation.DELETE);
      toggleFormErrorStyle(this._editEventComponent.getElement(), false);
      this._tripEventStore.deleteTripEvent(this._tripEvent.id);
    });

    this._editEventComponent.setRollupBtnClickHandler(() => {
      this._close();
    });

    this._editEventComponent.setCancelBtnClickHandler(() => {
      this._close();
    });

    this._editEventComponent.setFavoriteBtnClickHandler((isFavoriteCurrent) => {
      const updatedTripEvent = Object.assign({}, this._tripEvent, {isFavorite: isFavoriteCurrent});
      toggleFormErrorStyle(this._editEventComponent.getElement(), false);
      this._tripEvent.isFavorite = isFavoriteCurrent;
      this._tripEventStore.updateTripEvent(this._tripEvent.id, new TripEventModel(updatedTripEvent), true);
    });
  }

  _close() {
    this._callHandlers(this._closeEditEventHandelrs);
  }

  _onEscKeyDown(evt) {
    onEscEvent(evt, () => {
      this._close();
    });
  }

  _onErrorDataChangeHandler(isForced = false) {
    if (!isForced) {
      this._updateFormTrigger(this._editEventComponent.getElement());
    }
    toggleFormErrorStyle(this._editEventComponent.getElement(), true);
    shake(this._editEventComponent.getElement());
  }

  _onSuccessDataChangeHandler(isForced = false) {

    if (!isForced) {
      this._close();
    }
  }

  _callHandlers(handlers, isSelf) {
    handlers.forEach((handler) => handler(isSelf));
  }

}
