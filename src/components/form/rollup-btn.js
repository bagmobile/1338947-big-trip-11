import AbstractComponent from "../abstract-component.js";

const createRollupBtnTemplate = () => {
  return (`<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
</button>`);
};

export class RollupBtn extends AbstractComponent {

  getTemplate() {
    return createRollupBtnTemplate();
  }

}
