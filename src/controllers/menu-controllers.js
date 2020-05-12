import {Menu as MenuComponent} from "../components/menu.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {MenuTab} from "../config.js";
import {NewEventBtn as NewEventBtnComponent} from "../components/new-event-btn.js";
import TripEditEventController, {ModeEditEvent} from "./trip-edit-event-controller.js";
import {TripEventModel} from "../models/trip-event-model.js";

export default class MenuController {

  constructor(container, tripEventsModel, mainController) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;
    this._mainController = mainController;
    this._menuTabActionControllerMap = new Map();
    this._menuComponenet = new MenuComponent();
    this._newEventBtnComponent = new NewEventBtnComponent();

    this._onMenuTabChange = this._onMenuTabChange.bind(this);
    this._menuComponenet.setMenuTabChangeHandler(this._onMenuTabChange);

    this._onNewEventBtnClick = this._onNewEventBtnClick.bind(this);
    this._newEventBtnComponent.setNewEventBtnClickHandler(this._onNewEventBtnClick);

    this._mainController.addNewEventBtnClickListener(this._newEventBtnComponent);
  }

  setMenuTabActionController(menuAction) {
    this._menuTabActionControllerMap.set(...menuAction);
  }

  render() {
    render(this._container.querySelector(`.trip-controls h2:first-child`), this._menuComponenet, RenderPosition.AFTEREND);
    render(this._container, this._newEventBtnComponent, RenderPosition.BEFOREEND);
    this._menuTabActionControllerMap.forEach((actionController) => {
      actionController.render();
    });
    this._showTab();
  }

  _showTab() {
    switch (this._menuComponenet.getCurrentMenuTab()) {
      case MenuTab.TABLE:
        this._menuTabActionControllerMap.get(MenuTab.TABLE).showBoard();
        this._menuTabActionControllerMap.get(MenuTab.STATS).hideStats();
        break;
      case MenuTab.STATS:
        this._menuTabActionControllerMap.get(MenuTab.TABLE).hideBoard();
        this._menuTabActionControllerMap.get(MenuTab.STATS).showStats();
        break;
    }
  }

  _reset(menuTab) {
    remove(this._menuComponenet);
    this._menuComponenet = new MenuComponent(menuTab);
    this._menuComponenet.setMenuTabChangeHandler(this._onMenuTabChange);
    render(this._container.querySelector(`.trip-controls h2:first-child`), this._menuComponenet, RenderPosition.AFTEREND);
  }

  _onMenuTabChange(menuTab) {
    this._reset(menuTab);
    this._showTab();
  }

  _onNewEventBtnClick() {
    const boardController = this._menuTabActionControllerMap.get(MenuTab.TABLE);
    const tripEditEventController = new TripEditEventController(TripEventModel.getDefaultTripEvent(), ModeEditEvent.NEW);
    const activateBtnHandler = this._newEventBtnComponent.activateBtnHandler;
    const newEditEventPlaceClass = this._tripEventsModel.isEmpty() ? `.trip-events h2:first-child` : `.trip-events .trip-sort`;

    tripEditEventController.setCloseEditEventFormHandler(activateBtnHandler.bind(this._newEventBtnComponent, boardController));
    boardController.setActiveTripEditEventController(tripEditEventController);

    render(document.querySelector(newEditEventPlaceClass), tripEditEventController.getComponent(), RenderPosition.AFTEREND);
  }

}
