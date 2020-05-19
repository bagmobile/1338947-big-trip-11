import {render, RenderPosition} from "../utils/render";
import {TripStatsComponent} from "../components/trip-stats-component";
import MainController from "./main-controller";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {STATS_BAR_HEIGHT} from "../config";
import {formatDuration, getDuration, getTripEventTypes, getTripEventTypesList} from "../utils/common";
import moment from "moment";

export default class TripStatsController {

  constructor(container) {

    this._container = container;
    this._mainController = new MainController();
    this._tripEventStore = this._mainController.getTripEventStore();
    this._tripiStatsComponent = new TripStatsComponent();

    this._chartMoneyElement = null;
    this._chartTransportElement = null;
    this._chartTimeSpentElement = null;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts = this._renderCharts.bind(this);
    this._tripEventStore.setDataChangeHandler(this._renderCharts);

  }

  getTripEventDataByMoney() {
    return getTripEventTypesList()
      .map((tripEventType) => this.getTripDataForEventType(tripEventType))
      .sort((a, b) => b.money - a.money);
  }

  getTripEventDataByTransport() {
    const [transportTypes] = getTripEventTypes();

    return transportTypes.map((tripEventType) => this.getTripDataForEventType(tripEventType))
      .sort((a, b) => b.count - a.count);
  }

  getTripEventDataByTimeSpent() {
    return getTripEventTypesList()
      .map((tripEventType) => this.getTripDataForEventType(tripEventType))
      .sort((a, b) => b.duration - a.duration);
  }

  getTripDataForEventType(tripEventType) {

    return this._tripEventStore.getTripEvents()
      .filter((tripEvent) => tripEvent.type === tripEventType)
      .reduce((acc, item) => {
        acc.money += item.price;
        acc.count += 1;
        acc.duration += getDuration(item.startDateTime, item.endDateTime);
        return acc;
      }, {type: tripEventType, money: 0, count: 0, duration: 0});
  }

  render() {
    render(this._container, this._tripiStatsComponent, RenderPosition.BEFOREEND);
  }

  init() {
    this._chartMoneyElement = this._container.querySelector(`.statistics__chart--money`);
    this._chartTransportElement = this._container.querySelector(`.statistics__chart--transport`);
    this._chartTimeSpentElement = this._container.querySelector(`.statistics__chart--time`);
    this._renderCharts();
  }

  _renderCharts() {
    this._resetCharts();
    this._moneyChart = this.renderMoneyChart(this._chartMoneyElement);
    this._transportChart = this.renderTransportChart(this._chartTransportElement);
    this._timeSpentChart = this.renderTimeSpentChart(this._chartTimeSpentElement);
  }

  _resetCharts() {
    [this._moneyChart, this._transportChart, this._timeSpentChart].forEach((chart) => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    });
  }

  chartAnimationCallback(animation) {
    const ICON_SIZE = 20;
    const ICON_PADDING = ICON_SIZE;
    const chart = animation.chart;
    const axisY = chart.scales[`y-axis-0`];
    const ticks = axisY.ticks;
    const fontSize = axisY.options.ticks.fontSize;

    if (axisY.getPixelForTick(ticks.length - 1)) {
      ticks.forEach((tick, idx) => {

        const onLoadImage = (evt) => {
          const textParams = chart.ctx.font;
          chart.ctx.textAlign = `center`;
          chart.ctx.textBaseline = `bottom`;
          chart.ctx.font = `normal ${fontSize}px sans-serif`;
          const tickWidth = chart.ctx.measureText(tick).width;
          chart.ctx.font = textParams;

          const tickY = axisY.getPixelForTick(idx) - fontSize;
          const tickX = axisY.right - tickWidth - ICON_SIZE - ICON_PADDING;
          chart.ctx.drawImage(evt.target, tickX, tickY, ICON_SIZE, ICON_SIZE);
          evt.target.removeEventListener(`load`, onLoadImage);
        };

        const tickIcon = new Image();
        tickIcon.addEventListener(`load`, onLoadImage);
        tickIcon.src = `img/icons/${tick.toLowerCase()}.png`;
      });
    }
  }


  renderMoneyChart(container) {
    const labels = this.getTripEventDataByMoney().map((item) => item.type.toUpperCase());
    const data = this.getTripEventDataByMoney().map((item) => item.money);
    container.height = STATS_BAR_HEIGHT * labels.length;

    return new Chart(container, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
        }],
      },
      options: {
        events: [`click`],
        plugins: {
          datalabels: {
            font: {
              size: 14,
            },
            color: `green`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`,
          },
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `green`,
          fontSize: 20,
          position: `left`,
          padding: 45,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 2,
              fontSize: 14,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 34,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        layout: {
          padding: {
            left: 0,
            right: 150,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        animation: {
          onComplete: this.chartAnimationCallback,
        },
      },
    });

  }

  renderTransportChart(container) {
    const labels = this.getTripEventDataByTransport().map((item) => item.type.toUpperCase());
    const data = this.getTripEventDataByTransport().map((item) => item.count);
    container.height = STATS_BAR_HEIGHT * labels.length;

    return new Chart(container, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
        }],
      },
      options: {
        events: [`click`],
        plugins: {
          datalabels: {
            font: {
              size: 14,
            },
            color: `#172e85`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`,
          },
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#172e85`,
          fontSize: 20,
          position: `left`,
          padding: 45,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 2,
              fontSize: 14,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 34,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        layout: {
          padding: {
            left: 0,
            right: 150,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        animation: {
          onComplete: this.chartAnimationCallback,
        },
      },
    });

  }

  renderTimeSpentChart(container) {
    const labels = this.getTripEventDataByTimeSpent().map((item) => item.type.toUpperCase());
    const data = this.getTripEventDataByTimeSpent().map((item) => item.duration);
    container.height = STATS_BAR_HEIGHT * labels.length;

    return new Chart(container, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
        }],
      },
      options: {
        events: [`click`],
        plugins: {
          datalabels: {
            font: {
              size: 14,
            },
            color: `#5d0c23`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${formatDuration(moment.duration(val))}`,
          },
        },
        title: {
          display: true,
          text: `TIME SPENT`,
          fontColor: `#5d0c23`,
          fontSize: 20,
          position: `left`,
          padding: 45,
        },
        layout: {
          padding: {
            left: 0,
            right: 150,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 2,
              fontSize: 14,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 34,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        animation: {
          onComplete: this.chartAnimationCallback,
        },
      },
    });

  }
}
