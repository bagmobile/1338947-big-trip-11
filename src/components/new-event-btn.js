import AbstractComponent from "./abstract-component.js";

const createNewEventButtonTemplate = () => {
  return (`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`);
};

export class NewEventBtn extends AbstractComponent {


  getTemplate() {
    return createNewEventButtonTemplate();
  }

  setNewEventBtnClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.target.setAttribute(`disabled`, true);
      handler();
    });
  }

  activateBtnHandler(boardController) {
    boardController.setActiveTripEditEventController(null);
    this.getElement().removeAttribute(`disabled`);
  }

}
