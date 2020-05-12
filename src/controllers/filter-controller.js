import {remove, render, RenderPosition} from "../utils/render.js";
import {Filter as FilterComponent} from "../components/filter.js";
import {FilterType} from "../config";

export default class FilterController {

  constructor(container, tripEventModel, mainController) {
    this._contanier = container;
    this._tripEventModel = tripEventModel;
    this._mainController = mainController;
    this._filterComponent = new FilterComponent(this._tripEventModel);

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventModel.setDataChangeHandler(this._onDataChange);

    this._onCreateNewTripEvent = this._onCreateNewTripEvent.bind(this);
    this._mainController.setCreateNewEventHandler(this._onCreateNewTripEvent);
  }

  render() {
    render(this._contanier, this._filterComponent, RenderPosition.AFTEREND);
  }

  _reset(currentFilterType) {
    remove(this._filterComponent);
    this._filterComponent = new FilterComponent(this._tripEventModel, currentFilterType);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this.render();
  }

  _onDataChange() {
    this._reset(this._filterComponent.getCurrentFilterType());
  }

  _onFilterTypeChange(filterType) {
    this._tripEventModel.setFilter(filterType);
  }

  _onCreateNewTripEvent() {
    console.log(345);
    this._reset(FilterType.EVERYTHING);
  }


}
