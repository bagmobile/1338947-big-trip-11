import {TripStats as TripStatsComponent} from "../components/trip-stats.js";
import {render, RenderPosition} from "../utils/render.js";

export class TripStatsController {

  constructor(container, tripEventsModel) {
    this._container = container;
    this._tripEventModel = tripEventsModel;
    this._tripiStatsComponent = new TripStatsComponent();
  }

  showStats() {
    this._tripiStatsComponent.show();
  }

  hideStats() {
    this._tripiStatsComponent.hide();
  }

  render() {
    render(this._container, this._tripiStatsComponent, RenderPosition.AFTEREND);
  }
}
