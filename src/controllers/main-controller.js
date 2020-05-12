export default class MainController {

  constructor() {
    this._createNewEventHandlers = [];
  }


  setCreateNewEventHandler(handler) {
    this._createNewEventHandlers.push(handler);
  }

  addNewEventBtnClickListener(component) {
    component.setNewEventBtnClickHandler(() => {
      this._callHandlers(this._createNewEventHandlers);
    });
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
