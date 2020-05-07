import {TripEditEvent as TripEditEventComponent} from "../components/trip-edit-event.js";
import {remove, render, RenderPosition, replace} from "../utils/render.js";
import {isEscEvent} from "../utils/dom-utils";
import TripEventsModel from "../models/trip-events-model";
import {TripEventModel} from "../data/trip-event";
import TripOffersModel from "../models/trip-offers-model";


export const ModeEditEvent = {
  NEW: `new`,
  UPDATE: `update`,
};

export const ActionType = {
  CREATE: `create`,
  UPDATE: `update`,
  FORCE_UPDATE: `forceUpdate`,
  DELETE: `delete`,
};

export default class TripEditEventController {

  constructor(tripEvent, mode, sourceComponent) {

    this._tripEvent = tripEvent;
    this._mode = mode;
    this._sourceComponent = sourceComponent;
    this._editEventComponent = new TripEditEventComponent(this._tripEvent, this._mode);
    this._tripEventsModel = new TripEventsModel();
    this._tripOffersModel = new TripOffersModel();

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

  _onSubscribeOnEvents() {

    this._editEventComponent.setSubmitHandler(() => {
      const OFFER_INPUT_PREFIX = `event-offer-`;
      const updatedTripEvent = this._editEventComponent.getData();
      const checkedOfferElements = this._editEventComponent.getElement().querySelectorAll(`input.event__offer-checkbox:checked`);
      const availableOffers = this._tripOffersModel.getTripOffers(updatedTripEvent.type);

      updatedTripEvent.offers = Array.from(checkedOfferElements).map((input) => {
        return input.name.replace(`${OFFER_INPUT_PREFIX}${updatedTripEvent.type}_`, ``);
      }).map((index) => availableOffers[index]);

      this._tripEventsModel.updateTripEvent(this._tripEvent.id, new TripEventModel(updatedTripEvent));
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

    this._editEventComponent.setFavoriteBtnClickHandler(() => {
      const updatedTripEvent = Object.assign({}, this._tripEvent, {isFavorite: !this._tripEvent.isFavorite});
      this._tripEventsModel.updateTripEvent(this._tripEvent.id, new TripEventModel(updatedTripEvent), true);
    });
  }

  _destroy() {
    remove(this._editEventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _close() {
    if (this._sourceComponent) {
      replace(this._sourceComponent, this._editEventComponent);
    }
    this._destroy();
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, () => {
      this._close();
    });
  }


}
