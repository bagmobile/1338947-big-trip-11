import {MenuTab} from "../config";
import AbstractComponent from "./abstract-component";

const createMenuTab = (tab, isActive) => {
  const tabActiveClass = isActive ? `trip-tabs__btn--active` : ``;

  return (`<a class="trip-tabs__btn ${tabActiveClass}" href="#">${tab}</a>`);
};

const createMenuTemplate = (tabs, menuTab) => {
  const tabsList = tabs.map((tab) => createMenuTab(tab, tab === menuTab)).join(`\n`);

  return (`<nav class="trip-controls__trip-tabs  trip-tabs">${tabsList}</nav>`);
};

export class MenuComponent extends AbstractComponent {

  constructor(menuTab = MenuTab.TABLE) {
    super();
    this._currentMenuTab = menuTab;
  }

  getTemplate() {
    return createMenuTemplate(Object.values(MenuTab), this._currentMenuTab);
  }

  getCurrentMenuTab() {
    return this._currentMenuTab;
  }

  setMenuTabChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (this._currentMenuTab !== evt.target.innerText) {
        this._currentMenuTab = evt.target.innerText;
        handler();
      }
    });
  }

}
