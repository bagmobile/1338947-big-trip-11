import {createElement, remove, render, RenderPosition} from "../utils/render";
import {EventDestinationComponent} from "./event-destination-component";
import {EventOfferComponent, OfferListType} from "./event-offer-component";
import {ModeEditEvent} from "../controllers/trip-edit-event-controller";
import {formatToDefault, getFlatpickr} from "../utils/common";
import {EventDetailsComponent} from "./event-details-component";
import {SaveBtnComponent} from "./form/save-btn-component";
import {CancelBtnComponent} from "./form/cancel-btn-component";
import {DeleteBtnComponent} from "./form/delete-btn-component";
import {FavoriteBtnComponent} from "./form/favorite-btn-component";
import {RollupBtnComponent} from "./form/rollup-btn-component";
import {EventDestinationNameComponent} from "./event-destination-name-component";
import {EventTypeComponent} from "./event-type-component";
import {EventErrorComponent} from "./event-error-component";
import EventDestinationStore from "../models/event-destination-store";
import EventOfferStore from "../models/event-offer-store";
import AbstractComponent from "./abstract-component";
import TripEventStore from "../models/trip-event-store";

const createEditEventTemplate = (tripEvent, isNew) => {
  const {price} = tripEvent;
  const newEventEditClass = isNew ? `trip-events__item` : ``;

  return (`<form class="${newEventEditClass} event  event--edit" action="#" method="post">
                    <header class="event__header">

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${price}">
                      </div>

                    </header>
                  </form>`);
};

export class TripEditEventComponent extends AbstractComponent {

  constructor(tripEvent, mode) {
    super();
    this._mode = mode;
    this._tripEvent = tripEvent;
    this._startTimeFlatpickr = null;
    this._endTimeFlatpickr = null;
    this._isFavoriteCurrent = this._tripEvent.isFavorite;
    this._favoriteBtnClickHandler = null;

    this._tripEventStore = new TripEventStore();
    this._eventOfferStore = new EventOfferStore();
    this._eventDestinationStore = new EventDestinationStore();

    this._eventErrorComponent = new EventErrorComponent();
    this._eventTypeComponent = new EventTypeComponent(this._tripEvent);
    this._eventDestinationNameComponent = new EventDestinationNameComponent(this._tripEvent, this._eventDestinationStore);
    this._rollupBtnComponent = new RollupBtnComponent();
    this._favoriteBtnComponent = new FavoriteBtnComponent(this._tripEvent.isFavorite);
    this._deleteBtnComponent = new DeleteBtnComponent();
    this._cancelBtnComponent = new CancelBtnComponent();
    this._saveBtnComponent = new SaveBtnComponent();
    this._eventDetailsComponent = new EventDetailsComponent();
    this._eventOfferComponent = new EventOfferComponent(this._tripEvent, this._eventOfferStore, OfferListType.CHECKED_OPTION_LIST);
    this._eventDestinationComponent = new EventDestinationComponent(this._eventDestinationStore, this._tripEvent.destination);

    this._validatePeriod = this._validatePeriod.bind(this);
    this._applyFlatpickr();
    this._subscribeOnEvents();

  }

  getTemplate() {
    return createEditEventTemplate(this._tripEvent, this._mode === ModeEditEvent.NEW);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      render(this._element.querySelector(`.event__header`), this._eventTypeComponent, RenderPosition.AFTERBEGIN);
      render(this._element.querySelector(`.event__type-wrapper`), this._eventDestinationNameComponent, RenderPosition.AFTEREND);
      render(this._element.querySelector(`.event__field-group--price`), this._saveBtnComponent, RenderPosition.AFTEREND);
      render(this._element.querySelector(`.event__save-btn`), this._deleteBtnComponent, RenderPosition.AFTEREND);
      render(this._element.querySelector(`.event__reset-btn`), this._cancelBtnComponent, RenderPosition.AFTEREND);
      render(this._element.querySelector(`.event__header`), this._rollupBtnComponent, RenderPosition.BEFOREEND);
      render(this._element.querySelector(`.event__rollup-btn`), this._favoriteBtnComponent, RenderPosition.BEFOREBEGIN);
      render(this._element.querySelector(`.event__header`), this._eventDetailsComponent, RenderPosition.AFTEREND);
      render(this._element.querySelector(`.event__details`), this._eventOfferComponent, RenderPosition.AFTERBEGIN);
      render(this._element.querySelector(`.event__details`), this._eventDestinationComponent, RenderPosition.BEFOREEND);
      render(this._element, this._eventErrorComponent, RenderPosition.AFTERBEGIN);

      this._initViewMode(this._tripEvent.offers);
      this._setupViewEventDetails(this._eventOfferStore.hasOffers(this._tripEvent.type) || this._eventOfferStore.hasErrors(), false);
    }

    return this._element;
  }

  getData() {
    const [type, name, startDateTime, endDateTime, price] = (new FormData(this.getElement())).values();
    return Object.assign({}, this._tripEvent, {
      type,
      startDateTime: formatToDefault(startDateTime),
      endDateTime: formatToDefault(endDateTime),
      price: Number(price),
      destination: this._eventDestinationStore.hasErrors() ? this._tripEvent.destination : this._eventDestinationStore.getDestination(name),
      offers: this._getSelectedOffers(type),
      isFavorite: this._isFavoriteCurrent,
    });
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      if (this._validatePeriod()) {
        handler(this._mode);
      }
    });
  }

  setDeleteBtnClickHandler(handler) {
    this._deleteBtnComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  setCancelBtnClickHandler(handler) {
    this._cancelBtnComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  setFavoriteBtnClickHandler(handler) {
    this._favoriteBtnComponent.getElement().addEventListener(`click`, () => {
      this._isFavoriteCurrent = !this._tripEvent.isFavorite;
      this._favoriteBtnClickHandler = handler;
      handler(this._isFavoriteCurrent);
    });
  }

  setRollupBtnClickHandler(handler) {
    this._rollupBtnComponent.getElement().addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
    this._eventTypeComponent.setEventTypeChangeHandler((currentEventType) => {
      this._eventDestinationNameComponent.updateRoute(currentEventType);
      this._refreshEventOffer(currentEventType);
    });

    this._eventDestinationNameComponent.setEventDestinationNameChangeHandler((currentName) => {
      this._refreshEventDestination(currentName);
    });

    this._tripEventStore.setErrorDataChangeHandler((isForced) => {
      if (isForced) {
        remove(this._favoriteBtnComponent);
        this._tripEvent.isFavorite = !this._tripEvent.isFavorite;
        this._favoriteBtnComponent = new FavoriteBtnComponent(this._tripEvent.isFavorite);
        render(this._element.querySelector(`.event__rollup-btn`), this._favoriteBtnComponent, RenderPosition.BEFOREBEGIN);
        this.setFavoriteBtnClickHandler(this._favoriteBtnClickHandler);
      }
    });
  }

  _validatePeriod() {
    const startDateTime = formatToDefault(this._startTimeFlatpickr.input.value);
    const endDateTime = formatToDefault(this._endTimeFlatpickr.input.value);

    this._startTimeFlatpickr.input.setCustomValidity(``);
    if (new Date(startDateTime) > new Date(endDateTime)) {
      this._startTimeFlatpickr.input.setCustomValidity(`The date for beginning cannot be less than ending date`);
      return false;
    }
    return true;
  }

  _getSelectedOffers(type) {
    const checkedOfferElements = this.getElement().querySelectorAll(`input.event__offer-checkbox:checked`);
    const availableOffers = this._eventOfferStore.getOffersForType(type);

    if (this._eventOfferStore.hasErrors()) {
      return this._tripEvent.offers;
    }

    return Array.from(checkedOfferElements)
      .map((input) => {
        return input.name.replace(/^.+_/, ``);
      })
      .map((index) => availableOffers[index]);
  }

  _applyFlatpickr() {

    [this._startTimeFlatpickr, this._endTimeFlatpickr].forEach((flatpickrTime) => {
      if (flatpickrTime) {
        flatpickrTime.destroy();
        flatpickrTime = null;
      }
    });
    this._startTimeFlatpickr = getFlatpickr(new Date(this._tripEvent.startDateTime), this.getElement().querySelector(`#event-start-time-1`), this._validatePeriod);
    this._endTimeFlatpickr = getFlatpickr(new Date(this._tripEvent.endDateTime), this.getElement().querySelector(`#event-end-time-1`), this._validatePeriod);
  }

  _initViewMode() {

    this._eventDetailsComponent.hide();
    this._eventOfferComponent.hide();
    this._eventDestinationComponent.hide();

    if (this._eventDestinationStore.hasErrors()) {
      this._eventErrorComponent.show();
    }

    switch (this._mode) {
      case ModeEditEvent.NEW:
        this._deleteBtnComponent.hide();
        this._favoriteBtnComponent.hide();
        break;
      case ModeEditEvent.UPDATE:
        this._cancelBtnComponent.hide();
        break;
    }
  }

  _setupViewEventDetails(isExistOffers, isChangeDestination = true) {
    if (isExistOffers) {
      this._eventDetailsComponent.show();
      this._eventOfferComponent.show();
    }
    if (isChangeDestination) {
      this._eventDetailsComponent.show();
      this._eventDestinationComponent.show();
    }
  }

  _refreshEventOffer(currentEventType) {
    remove(this._eventOfferComponent);
    this._eventOfferComponent = new EventOfferComponent(this._tripEvent, this._eventOfferStore, OfferListType.AVAILABLE_OPTION_LIST, currentEventType);
    render(this._element.querySelector(`.event__details`), this._eventOfferComponent, RenderPosition.AFTERBEGIN);
    this._setupViewEventDetails(this._eventOfferStore.hasOffers(currentEventType) || this._eventOfferStore.hasErrors(), false);
  }

  _refreshEventDestination(currentName) {
    remove(this._eventDestinationComponent);
    this._eventDestinationComponent = new EventDestinationComponent(this._eventDestinationStore, this._tripEvent.destination, currentName);
    render(this._element.querySelector(`.event__details`), this._eventDestinationComponent, RenderPosition.BEFOREEND);
    this._setupViewEventDetails(false, this._eventDestinationStore.hasDescription(currentName));
  }

}
