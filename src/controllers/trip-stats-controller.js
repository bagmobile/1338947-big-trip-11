import {render, RenderPosition} from "../utils/render";
import {TripStatsComponent} from "../components/trip-stats-component";

export default class TripStatsController {

  constructor(container) {
    this._container = container;
    this._tripiStatsComponent = new TripStatsComponent();
  }

  render() {
    render(this._container, this._tripiStatsComponent, RenderPosition.AFTEREND);
  }
}
