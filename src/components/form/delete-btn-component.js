import AbstractComponent from "../abstract-component";

const createDeleteButtonTemplate = () => {
  return (`<button class="event__reset-btn" type="reset">Delete</button>`);
};

export class DeleteBtnComponent extends AbstractComponent {

  getTemplate() {
    return createDeleteButtonTemplate();
  }

}
