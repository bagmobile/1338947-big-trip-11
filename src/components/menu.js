import {createElement} from "../dom-util.js";

const createMenuTab = (tab, isActive) => {
  const {name, url} = tab;
  const tabActiveClass = isActive ? `trip-tabs__btn--active` : ``;

  return (`<a class="trip-tabs__btn ${tabActiveClass}" href="${url}">${name}</a>`);
};

const createMenuTemplate = (menu) => {
  const menuTabs = menu.map((tab, index) => createMenuTab(tab, index === 0)).join(`\n`);

  return (`<nav class="trip-controls__trip-tabs  trip-tabs">${menuTabs}</nav>`);
};

export class Menu {

  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._menu);
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
