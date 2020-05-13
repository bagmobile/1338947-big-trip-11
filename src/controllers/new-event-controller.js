import {ModeEditEvent} from "./trip-edit-event-controller";
import TripEventModel from "../models/trip-event-model";
import {render, RenderPosition} from "../utils/render";
import {NewEventBtnComponent} from "../components/new-event-btn-component";
import MainController from "./main-controller";

export default class NewEventController {

  constructor(container) {
    this._container = container;
    this._mainController = new MainController();
    this._tripEventStore = this._mainController.getTripEventStore();
    this._newEventBtnComponent = new NewEventBtnComponent();

    this._openTripEditHandler = null;
    this.setOpenTripEditEventHandler(this._mainController._openTripEditEventHandler);

    this._onNewEventBtnClick = this._onNewEventBtnClick.bind(this);
    this._newEventBtnComponent.setNewEventBtnClickHandler(this._onNewEventBtnClick);
  }

  getComponent() {
    return this._newEventBtnComponent;
  }

  render() {
    render(this._container, this._newEventBtnComponent, RenderPosition.BEFOREEND);
  }

  setOpenTripEditEventHandler(handler) {
    this._openTripEditHandler = handler;
  }

  _onNewEventBtnClick() {
    const targetContainer = this._tripEventStore.isEmpty() ? `h2:first-child` : `.trip-sort`;
    this._openTripEditHandler(TripEventModel.getDefaultTripEvent(), ModeEditEvent.NEW, null, targetContainer);
  }

}
