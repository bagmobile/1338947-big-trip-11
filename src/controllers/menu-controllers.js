import {remove, render, RenderPosition} from "../utils/render";
import {MenuComponent} from "../components/menu-component";
import {HIDDEN_CLASS} from "../components/abstract-component";
import {MenuTab} from "../config";


const actionTabContainer = {
  [MenuTab.TABLE]: `.trip-events`,
  [MenuTab.STATS]: `.statistics`,
};

export default class MenuController {

  constructor(container) {
    this._container = container.querySelector(`h2:first-child`);
    this._menuComponenet = new MenuComponent();

    this._onMenuTabChange = this._onMenuTabChange.bind(this);
    this._menuComponenet.setMenuTabChangeHandler(this._onMenuTabChange);
  }

  render() {
    render(this._container, this._menuComponenet, RenderPosition.AFTEREND);
  }

  showTab() {
    Object.entries(actionTabContainer).forEach(([index, item]) => {
      if (this._menuComponenet.getCurrentMenuTab() === index) {
        document.querySelector(item).classList.remove(HIDDEN_CLASS);
      } else {
        document.querySelector(item).classList.add(HIDDEN_CLASS);
      }
    });
  }

  _reset(currentMenuTab) {
    remove(this._menuComponenet);
    this._menuComponenet = new MenuComponent(currentMenuTab);
    this._menuComponenet.setMenuTabChangeHandler(this._onMenuTabChange);
    render(this._container, this._menuComponenet, RenderPosition.AFTEREND);
  }

  _onMenuTabChange() {
    this._reset(this._menuComponenet.getCurrentMenuTab());
    this.showTab();
  }
}
