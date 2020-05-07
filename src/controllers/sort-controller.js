import {Sort as SortComponent} from "../components/sort.js";
import {remove, render, RenderPosition} from "../utils/render.js";

export default class SortController {

  constructor(container, tripEventModel) {
    this._container = container;
    this._tripEventModel = tripEventModel;
    this._sortComponent = new SortComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  getSortComponent() {
    return this._sortComponent;
  }

  render() {
    const headerTripEventElement = this._container.querySelector(`h2:first-child`);
    render(headerTripEventElement, this._sortComponent, RenderPosition.AFTEREND);
  }

  reset() {
    remove(this._sortComponent);
    this._sortComponent = new SortComponent();
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this.render();
  }

  getCurrentSortType() {
    return this._sortComponent.getCurrentSortType();
  }

  _onSortTypeChange(sortType) {
    this._tripEventModel.setSort(sortType);
  }

}
