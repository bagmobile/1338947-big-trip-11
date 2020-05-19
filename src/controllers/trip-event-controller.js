import {render, RenderPosition} from "../utils/render";
import {ModeEditEvent} from "./trip-edit-event-controller";
import {TripEventComponent} from "../components/trip-event-component";
import MainController from "./main-controller";

export default class TripEventController {

  constructor(boardController, tripEvent) {
    this._tripEvent = tripEvent;
    this._mainController = new MainController();
    this._eventComponent = new TripEventComponent(tripEvent);

    this.refreshTripEventHandler = this.refreshTripEventHandler.bind(this);

    this._openTripEditHandler = null;
    this.setOpenTripEditEventHandler(this._mainController._openTripEditEventHandler);

    this._onOpenTripEditEvent = this._onOpenTripEditEvent.bind(this);
    this._eventComponent.setRollupBtnClickHandler(this._onOpenTripEditEvent);
  }

  setOpenTripEditEventHandler(handler) {
    this._openTripEditHandler = handler;
  }

  _onOpenTripEditEvent() {
    if (this._openTripEditHandler) {
      this._openTripEditHandler(this._tripEvent, ModeEditEvent.UPDATE, this._eventComponent);
    }
  }

  refreshTripEventHandler(tripEvent) {
    this._tripEvent = tripEvent;
  }

  render(container) {
    render(container, this._eventComponent, RenderPosition.AFTERBEGIN);
  }

}
