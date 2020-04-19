import {createElement} from "../../dom-util.js";

const createDeleteButtonTemplate = () => {
  return (`<button class="event__reset-btn" type="reset">Delete</button>`);
};

export class DeleteBtn {

  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDeleteButtonTemplate();
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
