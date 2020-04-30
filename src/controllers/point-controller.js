import {TripEvent as TripEventComponent} from "../components/trip-event.js";
import {EditEvent as EditEventComponent} from "../components/trip-edit-event.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {isEscEvent} from "../utils/dom-util.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(tripEvent) {
    const oldEventComponent = this._eventComponent;
    const oldEditEventComponent = this._editEventComponent;

    this._eventComponent = new TripEventComponent(tripEvent);
    this._editEventComponent = new EditEventComponent(tripEvent);

    this._editEventComponent.setSubmitHandler(() => {
      this._replaceEditToEvent();
    });

    this._eventComponent.setRollupBtnClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editEventComponent.setRollupBtnClickHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editEventComponent.setFavoriteBtnClickHandler(() => {
      this._onDataChange(this, tripEvent, Object.assign({}, tripEvent, {
        isFavorite: !tripEvent.isFavorite,
      }));
      this._replaceEventToEdit();
    });

    if (oldEventComponent && oldEditEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._editEventComponent, oldEditEventComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._editEventComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    this._editEventComponent.reset();
    replace(this._eventComponent, this._editEventComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    isEscEvent(evt, () => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }
}
