import {render, RenderPosition} from "../utils/render.js";
import {Filter as FilterComponent} from "../components/filter.js";

export default class FilterController {

  constructor(container, tripEventModel) {
    this._contanier = container;
    this._tripEventModel = tripEventModel;
    this._filterComponent = new FilterComponent();

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
  }

  render() {
    render(this._contanier, this._filterComponent, RenderPosition.AFTEREND);
  }

  _onFilterTypeChange(filterType) {
    this._tripEventModel.setFilter(filterType);
  }

}
