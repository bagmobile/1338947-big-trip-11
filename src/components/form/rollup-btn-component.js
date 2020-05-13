import AbstractComponent from "../abstract-component";

const createRollupBtnTemplate = () => {
  return (`<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
</button>`);
};

export class RollupBtnComponent extends AbstractComponent {

  getTemplate() {
    return createRollupBtnTemplate();
  }

}
