import {getShortFormatDate} from "../utils/util.js";
import {TripTown as TripTownComponent} from "./trip-town.js";
import {EventType as EventTypeComponent} from "./event-type.js";
import {EventDetails as EventDetailsComponent} from "./event-details.js";
import {RollupBtn as RollupBtnComponent} from "./form/rollup-btn.js";
import {SaveBtn as SaveBtnComponent} from "./form/save-btn.js";
import {DeleteBtn as DeleteBtnComponent} from "./form/delete-btn.js";
import {FavoriteBtn as FavoriteBtnComponent} from "./form/favorite-btn.js";
import {CancelBtn as CancelBtnComponent} from "./form/cancel-btn.js";
import AbstractSmartComponent from "./abstract-start-component.js";

const createEditEventTemplate = (tripEvent, isNew, options) => {
  const {startDateTime, endDateTime, price, isFavorite} = tripEvent;
  const {currentEventType: icon} = options;

  const startTime = getShortFormatDate(startDateTime);
  const endTime = getShortFormatDate(endDateTime);
  const tripTownList = new TripTownComponent(tripEvent).getTemplate(options);
  const eventTypeList = new EventTypeComponent(tripEvent).getTemplate(options);
  const eventDetails = !isNew ? new EventDetailsComponent(tripEvent).getTemplate(options) : ``;
  const rollupBtn = !isNew ? new RollupBtnComponent().getTemplate() : ``;
  const saveBtn = new SaveBtnComponent().getTemplate();
  const cancelBtn = isNew ? new CancelBtnComponent().getTemplate() : ``;
  const deleteBtn = !isNew ? new DeleteBtnComponent().getTemplate() : ``;
  const favoriteBtn = !isNew ? new FavoriteBtnComponent(isFavorite).getTemplate() : ``;

  return (`<li class="trip-events__item">
                  <form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}.png" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                        ${eventTypeList}
                      </div>
                        ${tripTownList}
                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                    ${saveBtn}
                    ${deleteBtn}
                    ${cancelBtn}
                    ${favoriteBtn}
                    ${rollupBtn}
                    </header>
                    ${eventDetails}
                  </form>
                </li>`);
};

export class EditEvent extends AbstractSmartComponent {

  constructor(tripEvent, isNew = false) {
    super();
    this._tripEvent = tripEvent;
    this._isNew = isNew;
    this._submitHandler = null;
    this._rollupBtnClickHandler = null;
    this._favoriteBtnClickHandler = null;
    this._currentEventType = tripEvent.type;
    this._currentTown = tripEvent.town;
    this._isChangeEventType = false;
    this._isChangeTown = false;

    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setRollupBtnClickHandler(this._rollupBtnClickHandler);
    this.setFavoriteBtnClickHandler(this._favoriteBtnClickHandler);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditEventTemplate(this._tripEvent, this._isNew, {
      currentEventType: this._currentEventType,
      currentTown: this._currentTown,
      isChangeEventType: this._isChangeEventType,
      isChangeTown: this._isChangeTown,
    });
  }

  reset() {
    const tripEvent = this._tripEvent;
    this._isChangeEventType = false;
    this._isChangeTown = false;
    this._currentEventType = tripEvent.type;
    this._currentTown = tripEvent.town;
    this.rerender();
  }

  setSubmitHandler(cb) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, cb);
    this._submitHandler = cb;
  }

  setRollupBtnClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
    this._rollupBtnClickHandler = cb;
  }

  setFavoriteBtnClickHandler(cb) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, cb);
    this._favoriteBtnClickHandler = cb;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-group`)
      .forEach((item) => item.addEventListener(`change`, (evt) => {
        this._currentEventType = evt.target.value;
        this.rerender();
      }));

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      this._currentTown = evt.target.value;
      this._isChangeTown = !this._isChangeTown;
      this.rerender();
    });
  }

}
