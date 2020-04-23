import AbstractComponent from "../abstract-component.js";

const createSaveButtonTemplate = () => {
  return (`<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>`);
};

export class SaveBtn extends AbstractComponent {

  getTemplate() {
    return createSaveButtonTemplate();
  }

}
