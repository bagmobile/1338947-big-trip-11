import AbstractComponent from "../abstract-component";

const createCancelBtnTemplate = () => {
  return (`<button class="event__reset-btn" type="reset">Cancel</button>`);
};

export class CancelBtnComponent extends AbstractComponent {

  getTemplate() {
    return createCancelBtnTemplate();
  }

}
