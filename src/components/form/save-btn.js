import {createElement} from "../../dom-util.js";

const createSaveButtonTemplate = () => {
  return (`<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>`);
};

export class SaveBtn {

  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSaveButtonTemplate();
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
