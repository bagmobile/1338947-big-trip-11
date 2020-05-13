import {FilterType} from "../config";
import {FilterComponent} from "../components/filter-component";
import {remove, render, RenderPosition} from "../utils/render";
import MainController from "./main-controller";


export default class FilterController {

  constructor(container) {
    this._contanier = container;
    this._mainController = new MainController();
    this._tripEventStore = this._mainController.getTripEventStore();
    this._filterComponent = new FilterComponent(this._tripEventStore);

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);

    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventStore.setDataChangeHandler(this._onDataChange);

    this._onCreateNewTripEvent = this._onCreateNewTripEvent.bind(this);
    this._mainController.setCreateNewEventHandler(this._onCreateNewTripEvent);
  }

  getComponent() {
    return this._filterComponent;
  }

  render() {
    render(this._contanier.querySelector(`h2:last-child`), this._filterComponent, RenderPosition.AFTEREND);
  }

  _reset(currentFilterType) {
    remove(this._filterComponent);
    this._filterComponent = new FilterComponent(this._tripEventStore, currentFilterType);
    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this.render();
  }

  _onDataChange() {
    this._reset(this._filterComponent.getCurrentFilterType());
  }

  _onFilterTypeChange(filterType) {
    this._tripEventStore.setFilter(filterType);
  }

  _onCreateNewTripEvent() {
    if (this._filterComponent.getCurrentFilterType() !== FilterType.EVERYTHING) {
      this._reset(FilterType.EVERYTHING);
      this._tripEventStore.setFilter(FilterType.EVERYTHING, false);
    }
  }


}
