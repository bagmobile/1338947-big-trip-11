import AbstractComponent from "./abstract-component.js";

const createMenuTab = (tab, isActive) => {
  const {name, url} = tab;
  const tabActiveClass = isActive ? `trip-tabs__btn--active` : ``;

  return (`<a class="trip-tabs__btn ${tabActiveClass}" href="${url}">${name}</a>`);
};

const createMenuTemplate = (menu) => {
  const menuTabs = menu.map((tab, index) => createMenuTab(tab, index === 0)).join(`\n`);

  return (`<nav class="trip-controls__trip-tabs  trip-tabs">${menuTabs}</nav>`);
};

export class Menu extends AbstractComponent {

  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return createMenuTemplate(this._menu);
  }

}
