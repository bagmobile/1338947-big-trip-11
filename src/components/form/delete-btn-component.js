import AbstractComponent from "../abstract-component";

const createDeleteBtnTemplate = () => {
  return (`<button class="event__reset-btn" type="reset">Delete</button>`);
};

export class DeleteBtnComponent extends AbstractComponent {

  getTemplate() {
    return createDeleteBtnTemplate();
  }

}
