import {remove, render, RenderPosition} from "../utils/render.js";
import {Filter as FilterComponent} from "../components/filter.js";

export default class FilterController {

  constructor(container, tripEventModel) {
    this._contanier = container;
    this._tripEventModel = tripEventModel;
    this._filterComponent = new FilterComponent(this._tripEventModel.getAvailableFilterTypes());

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    render(this._contanier, this._filterComponent, RenderPosition.AFTEREND);
  }

  _onDataChange() {
    const currentFilterType = this._filterComponent.getCurrentFilterType();
    remove(this._filterComponent);
    this._filterComponent = new FilterComponent(this._tripEventModel.getAvailableFilterTypes(), currentFilterType);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this.render();
  }

  _onFilterTypeChange(filterType) {
    this._tripEventModel.setFilter(filterType);
  }

}
