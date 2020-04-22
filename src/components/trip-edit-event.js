import AbstractComponent from "./abstract-component.js";
import {getShortFormatDate} from "../utils/util.js";
import {TripTown as TripTownComponent} from "./trip-town.js";
import {EventType as EventTypeComponent} from "./event-type.js";
import {EventDetails as EventDetailsComponent} from "./event-details.js";
import {RollupBtn as RollupBtnComponent} from "./form/rollup-btn.js";
import {SaveBtn as SaveBtnComponent} from "./form/save-btn.js";
import {DeleteBtn as DeleteBtnComponent} from "./form/delete-btn.js";
import {FavoriteBtn as FavoriteBtnComponent} from "./form/favorite-btn.js";
import {CancelBtn as CancelBtnComponent} from "./form/cancel-btn.js";

const createEditEventTemplate = (tripEvent, isNew) => {
  const {icon, startDateTime, endDateTime, price, offers, isFavorite} = tripEvent;
  const startTime = getShortFormatDate(startDateTime);
  const endTime = getShortFormatDate(endDateTime);
  const tripTownList = new TripTownComponent(tripEvent).getTemplate();
  const eventTypeList = new EventTypeComponent(tripEvent).getTemplate();
  const eventDetails = !isNew ? new EventDetailsComponent(offers).getTemplate() : ``;
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
                          <img class="event__type-icon" width="17" height="17" src="img/icons/${icon}" alt="Event type icon">
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

export class EditEvent extends AbstractComponent {

  constructor(tripEvent, isNew = false) {
    super();
    this._tripEvent = tripEvent;
    this._isNew = isNew;
  }

  getTemplate() {
    return createEditEventTemplate(this._tripEvent, this._isNew);
  }

  setSubmitHandler(cb) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, cb);
  }

  setRollupBtnClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
  }

}
