import {remove, render, RenderPosition} from "../utils/render";
import {TripInfoComponent} from "../components/trip-info-component";
import MainController from "./main-controller";

export default class TripInfoController {

  constructor(container) {
    this._container = container;
    this._tripEventStore = new MainController().getTripEventStore();
    this._tripInfoComponent = new TripInfoComponent(this._tripEventStore);

    this._onRefreshTripInfo = this._onRefreshTripInfo.bind(this);
    this._tripEventStore.setFilterTypeChangeHandler(this._onRefreshTripInfo);
    this._tripEventStore.setDataChangeHandler(this._onRefreshTripInfo);
  }

  render() {
    render(this._container, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _onRefreshTripInfo() {
    remove(this._tripInfoComponent);
    this.render();
  }

}
