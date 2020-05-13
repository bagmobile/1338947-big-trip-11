import AbstractComponent from "./abstract-component";

const createNewEventButtonTemplate = () => {
  return (`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`);
};

export class NewEventBtnComponent extends AbstractComponent {


  getTemplate() {
    return createNewEventButtonTemplate();
  }

  setNewEventBtnClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.target.setAttribute(`disabled`, true);
      handler();
    });
  }

}
