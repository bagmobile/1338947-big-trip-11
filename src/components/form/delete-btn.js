import AbstractComponent from "../abstract-component.js";

const createDeleteButtonTemplate = () => {
  return (`<button class="event__reset-btn" type="reset">Delete</button>`);
};

export class DeleteBtn extends AbstractComponent {

  getTemplate() {
    return createDeleteButtonTemplate();
  }

}
