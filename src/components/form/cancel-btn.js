import AbstractComponent from "../abstract-component.js";

const createCancelButtonTemplate = () => {
  return (`<button class="event__reset-btn" type="reset">Cancel</button>`);
};

export class CancelBtn extends AbstractComponent {

  getTemplate() {
    return createCancelButtonTemplate();
  }

}
