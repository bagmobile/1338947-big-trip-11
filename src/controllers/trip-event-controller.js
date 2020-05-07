import {TripEvent as TripEventComponent} from "../components/trip-event.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import TripEditEventController, {ModeEditEvent} from "./trip-edit-event-controller";

const Mode = {
  CREATE: `create`,
  VIEW: `view`,
  UPDATE: `update`,
  DELETE: `delete`,
};

export default class TripEventController {

  constructor(tripEvent) {
    this._tripEvent = tripEvent;
    this._eventComponent = new TripEventComponent(tripEvent);

    this.refreshTripEventHandler = this.refreshTripEventHandler.bind(this);

    this._onSubscribeOnEvents();
  }

  _onSubscribeOnEvents() {

    this._eventComponent.setRollupBtnClickHandler(() => {
      const tripEditEventController = new TripEditEventController(this._tripEvent, ModeEditEvent.UPDATE, this._eventComponent);
      replace(tripEditEventController.getComponent(), this._eventComponent);
    });
  }

  refreshTripEventHandler(tripEvent) {
    this._tripEvent = tripEvent;
  }

  render(container) {
    render(container, this._eventComponent, RenderPosition.AFTERBEGIN);
  }


}
