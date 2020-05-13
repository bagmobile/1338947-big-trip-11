import {SortType} from "../config";
import {SortComponent} from "../components/sort-component";
import {remove, render, RenderPosition} from "../utils/render";
import MainController from "./main-controller";

export default class SortController {

  constructor(container) {
    this._container = container.querySelector(`h2:first-child`);
    this._mainController = new MainController();
    this._tripEventStore = this._mainController.getTripEventStore();
    this._sortComponent = new SortComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._onDataChange = this._onDataChange.bind(this);
    this._tripEventStore.setDataChangeHandler(this._onDataChange);

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._tripEventStore.setFilterTypeChangeHandler(this._onFilterTypeChange);

    this._onCreateNewTripEvent = this._onCreateNewTripEvent.bind(this);
    this._mainController.setCreateNewEventHandler(this._onCreateNewTripEvent);
  }

  getComponent() {
    return this._sortComponent;
  }

  render() {
    if (!this._tripEventStore.isEmpty()) {
      render(this._container, this._sortComponent, RenderPosition.AFTEREND);
    }
  }

  _reset(currentSortType) {
    remove(this._sortComponent);
    this._sortComponent = new SortComponent(currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this.render();
  }

  _onSortTypeChange(sortType) {
    this._tripEventStore.setSort(sortType);
  }

  _onDataChange() {
    this._reset(this._sortComponent.getCurrentSortType());
  }

  _onFilterTypeChange() {
    this._reset(SortType.EVENT);
  }

  _onCreateNewTripEvent() {
    if (this._sortComponent.getCurrentSortType() !== SortType.EVENT) {
      this._reset(SortType.EVENT);
      this._tripEventStore.setSort(SortType.EVENT, false);
    }
  }


}
