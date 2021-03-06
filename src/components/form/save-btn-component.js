import AbstractComponent from "../abstract-component";

const createSaveBtnTemplate = () => {
  return (`<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>`);
};

export class SaveBtnComponent extends AbstractComponent {

  getTemplate() {
    return createSaveBtnTemplate();
  }

}
