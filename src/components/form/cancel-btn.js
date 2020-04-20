import {createElement} from "../../dom-util.js";

const createCancelButtonTemplate = () => {
  return (`<button class="event__reset-btn" type="reset">Cancel</button>`);
};

export class CancelBtn {

  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCancelButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
