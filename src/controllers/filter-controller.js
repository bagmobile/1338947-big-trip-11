import {remove, render, RenderPosition} from "../utils/render.js";
import {Filter as FilterComponent} from "../components/filter.js";

export default class FilterController {

  constructor(container, tripEventModel) {
    this._contanier = container;
    this._tripEventModel = tripEventModel;
    this._filterComponent = new FilterComponent(this._tripEventModel);

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    render(this._contanier, this._filterComponent, RenderPosition.AFTEREND);
  }

  _reset() {
    const currentFilterType = this._filterComponent.getCurrentFilterType();
    remove(this._filterComponent);
    this._filterComponent = new FilterComponent(this._tripEventModel, currentFilterType);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this.render();
  }

  _onDataChange() {
    this._reset();
  }

  _onFilterTypeChange(filterType) {
    this._tripEventModel.setFilter(filterType);
  }

}
