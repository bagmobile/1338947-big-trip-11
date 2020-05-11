import {render, RenderPosition} from "../utils/render.js";
import {TripInfo as TripInfoComponent} from "../components/trip-info.js";
import {remove} from "../utils/render.js";

export default class TripInfoController {

  constructor(container, tripEventsModel) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;
    this._tripInfoComponent = new TripInfoComponent(this._tripEventsModel);

    this._onRefreshTripInfo = this._onRefreshTripInfo.bind(this);
    this._tripEventsModel.setFilterTypeChangeHandler(this._onRefreshTripInfo);
    this._tripEventsModel.setDataChangeHandler(this._onRefreshTripInfo);
  }

  render() {
    render(this._container, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _onRefreshTripInfo() {
    remove(this._tripInfoComponent);
    this.render();
  }


}
