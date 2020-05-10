import {TripEvent as TripEventComponent} from "../components/trip-event.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import TripEditEventController, {ModeEditEvent} from "./trip-edit-event-controller";

export default class TripEventController {

  constructor(boardController, tripEvent) {
    this._tripEvent = tripEvent;
    this._boarController = boardController;
    this._eventComponent = new TripEventComponent(tripEvent);

    this.refreshTripEventHandler = this.refreshTripEventHandler.bind(this);

    this._onCloseTripEditEvent = this._onCloseTripEditEvent.bind(this);

    this._onSubscribeOnEvents();
  }

  _onSubscribeOnEvents() {

    this._eventComponent.setRollupBtnClickHandler(() => {
      const tripEditEventController = new TripEditEventController(this._tripEvent, ModeEditEvent.UPDATE, this._eventComponent);
      tripEditEventController.setCloseEditEventFormHandler(this._onCloseTripEditEvent);
      replace(tripEditEventController.getComponent(), this._eventComponent);
      this._boarController.setActiveTripEditEventController(tripEditEventController);
    });
  }

  _onCloseTripEditEvent(isSelf) {
    if (isSelf) {
      this._boarController.setActiveTripEditEventController(null);
    }
  }

  refreshTripEventHandler(tripEvent) {
    this._tripEvent = tripEvent;
  }

  render(container) {
    render(container, this._eventComponent, RenderPosition.AFTERBEGIN);
  }

}
