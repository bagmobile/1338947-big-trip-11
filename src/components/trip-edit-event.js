import "flatpickr/dist/flatpickr.min.css";
import {TripTown as TripTownComponent} from "./trip-town.js";
import {EventType as EventTypeComponent} from "./event-type.js";
import {RollupBtn as RollupBtnComponent} from "./form/rollup-btn.js";
import {SaveBtn as SaveBtnComponent} from "./form/save-btn.js";
import {DeleteBtn as DeleteBtnComponent} from "./form/delete-btn.js";
import {FavoriteBtn as FavoriteBtnComponent} from "./form/favorite-btn.js";
import {CancelBtn as CancelBtnComponent} from "./form/cancel-btn.js";
import AbstractSmartComponent from "./abstract-start-component.js";
import {formatToDefault, getFlatpickr} from "../utils/common.js";
import {createElement} from "../utils/render.js";
import {EventOffer as EventOfferComponent, OfferListType} from "./event-offer.js";
import {EventDestination} from "./event-destination.js";
import TripOffersModel from "../models/trip-offers-model";
import {EventDetails} from "./event-details";
import TripDestinationsModel from "../models/trip-destinations-model";
import {ModeEditEvent} from "../controllers/trip-edit-event-controller";
import {remove} from "../utils/render";

const createEditEventTemplate = (tripEvent) => {
  const {price} = tripEvent;

  return (`<form class="event  event--edit" action="#" method="post">
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
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                    </header>
                  </form>`);
};

export class TripEditEvent extends AbstractSmartComponent {

  constructor(tripEvent, mode) {
    super();
    this._mode = mode;
    this._tripEvent = tripEvent;

    this._tripOffersModel = new TripOffersModel();
    this._tripDestinationModel = new TripDestinationsModel();

    this._eventTypeComponent = new EventTypeComponent(this._tripEvent);
    this._tripTownComponent = new TripTownComponent(this._tripEvent, this._tripDestinationModel);

    this._rollupBtnComponent = new RollupBtnComponent();
    this._favoriteBtnComponent = new FavoriteBtnComponent(this._tripEvent.isFavorite);
    this._deleteBtnComponent = new DeleteBtnComponent();
    this._cancelBtnComponent = new CancelBtnComponent();
    this._saveBtnComponent = new SaveBtnComponent();
    this._eventDetailsComponent = new EventDetails();

    this._offerListComponent = new EventOfferComponent(this._tripEvent, this._tripOffersModel, OfferListType.CHECKED_OPTION_LIST);
    this._eventDestinationComponent = new EventDestination(this._tripEvent);

    this._startTimeFlatpickr = null;
    this._endTimeFlatpickr = null;

    this._applyFlatpickr();

    this._subscribeOnEvents();

    //this.refreshTripEvent = this.refreshTripEvent.bind(this);
  }

  recoveryListeners() {
    /*this.setSubmitHandler(this._submitHandler);
    this.setRollupBtnClickHandler(this._rollupBtnClickHandler);
    this.setFavoriteBtnClickHandler(this._favoriteBtnClickHandler);
    this._subscribeOnEvents();*/
  }

  getTemplate() {
    return createEditEventTemplate(this._tripEvent);
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  getData() {
    const [type, town, startDateTime, endDateTime, price] = (new FormData(this.getElement())).values();

    return Object.assign({}, this._tripEvent, {
      type,
      startDateTime: formatToDefault(startDateTime),
      endDateTime: formatToDefault(endDateTime),
      price: Number(price),
      destination: this._tripDestinationModel.getDestination(town),
    });
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      handler();
    });
    this._submitHandler = handler;
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
    this._element.querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
  }

  setRollupBtnClickHandler(handler) {
    this._rollupBtnComponent.getElement().addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {

    this._eventTypeComponent.setEventTypeChangeHandler((currentEventType) => {
      this._tripTownComponent.updateRoute(currentEventType);
      remove(this._offerListComponent);
      this._offerListComponent = new EventOfferComponent(this._tripEvent, this._tripOffersModel, OfferListType.AVAILABLE_OPTION_LIST);
      this._element.querySelector(`.event__details`).prepend(this._offerListComponent.getElement());
      this._setViewMode(this._tripOffersModel.getTripOffers(currentEventType));
    });

    this._tripTownComponent.setTripTownChangeHandler((currentTown) => {
      console.log(currentTown);
    });
  }

  _applyFlatpickr() {

    [this._startTimeFlatpickr, this._endTimeFlatpickr].forEach((flatpickrTime) => {
      if (flatpickrTime) {
        flatpickrTime.destroy();
        flatpickrTime = null;
      }
    });

    this._startTimeFlatpickr = getFlatpickr(new Date(this._tripEvent.startDateTime), this.getElement().querySelector(`#event-start-time-1`));
    this._endTimeFlatpickr = getFlatpickr(new Date(this._tripEvent.endDateTime), this.getElement().querySelector(`#event-end-time-1`));
  }

  /* refreshTripEvent(tripEvent) {
     this._tripEvent = tripEvent;
   }*/

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      // render(this._element, this._eventTypeComponent.getElement(), RenderPosition.AFTERBEGIN);
      this._element.querySelector(`.event__header`).prepend(this._eventTypeComponent.getElement());
      this._element.querySelector(`.event__type-wrapper`).after(this._tripTownComponent.getElement());

      this._element.querySelector(`.event__field-group--price`).after(this._saveBtnComponent.getElement());
      this._element.querySelector(`.event__save-btn`).after(this._deleteBtnComponent.getElement());
      this._element.querySelector(`.event__reset-btn`).after(this._cancelBtnComponent.getElement());
      this._element.querySelector(`.event__header`).append(this._rollupBtnComponent.getElement());

      this._element.querySelector(`.event__rollup-btn`).before(...this._favoriteBtnComponent.getElement());

      this._element.querySelector(`.event__header`).after(this._eventDetailsComponent.getElement());
      this._element.querySelector(`.event__details`).prepend(this._offerListComponent.getElement());
      this._element.querySelector(`.event__details`).append(this._eventDestinationComponent.getElement());

      this._setViewMode(this._tripEvent.offers);
    }

    return this._element;
  }

  _setViewMode(offers) {

    this._eventDetailsComponent.hide();
    this._offerListComponent.hide();
    this._eventDestinationComponent.hide();

    switch (this._mode) {
      case ModeEditEvent.NEW:
        this._deleteBtnComponent.hide();
        this._favoriteBtnComponent.hide();
        break;
      case ModeEditEvent.UPDATE:
        this._cancelBtnComponent.hide();
        if (offers.length !== 0) {
          this._eventDetailsComponent.show();
          this._offerListComponent.show();
        }
        break;
    }


  }

}
