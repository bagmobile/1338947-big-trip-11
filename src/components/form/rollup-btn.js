import {createElement} from "../../dom-util.js";

const createRollupBtnTemplate = () => {
  return (`<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
</button>`);
};

export class RollupBtn {

  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRollupBtnTemplate();
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
