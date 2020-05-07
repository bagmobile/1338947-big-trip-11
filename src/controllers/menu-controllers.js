import {Menu as MenuComponent} from "../components/menu.js";
import {show, hide, remove, render, RenderPosition} from "../utils/render.js";
import {MenuTab} from "../config";

export default class MenuController {
  constructor(container) {
    this._container = container;
    this._menuTabActionControllerMap = new Map();
    this._menuComponenet = new MenuComponent();

    this._onMenuTabChange = this._onMenuTabChange.bind(this);
    this._menuComponenet.setMenuTabChangeHandler(this._onMenuTabChange);
  }

  setMenuTabActionController(menuAction) {
    this._menuTabActionControllerMap.set(...menuAction);
  }

  render() {
    render(this._container, this._menuComponenet, RenderPosition.AFTEREND);
    this._menuTabActionControllerMap.forEach((actionController) => {
      actionController.render();
    });
    this._showTab();
  }

  _showTab() {
    switch (this._menuComponenet.getCurrentMenuTab()) {
      case MenuTab.TABLE:
        this._menuTabActionControllerMap.get(MenuTab.TABLE).showBoard();
        this._menuTabActionControllerMap.get(MenuTab.STATS).hideStats();
        break;
      case MenuTab.STATS:
        this._menuTabActionControllerMap.get(MenuTab.TABLE).hideBoard();
        this._menuTabActionControllerMap.get(MenuTab.STATS).showStats();
        break;
    }
  }

  _reset(menuTab) {
    remove(this._menuComponenet);
    this._menuComponenet = new MenuComponent(menuTab);
    this._menuComponenet.setMenuTabChangeHandler(this._onMenuTabChange);
    render(this._container, this._menuComponenet, RenderPosition.AFTEREND);
  }

  _onMenuTabChange(menuTab) {
    this._reset(menuTab);
    this._showTab();
  }

}
