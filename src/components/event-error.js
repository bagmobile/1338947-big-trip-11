import AbstractComponent from "./abstract-component";

function createEventErrorTemplate() {
  return (`<p style="color: red; padding: 20px" >Error! Editing points of destination is not available now!</p>`);
}

export class EventError extends AbstractComponent{

  getTemplate() {
    return createEventErrorTemplate();
  }


  getElement() {
    super.getElement();
    this.hide();
    return this._element;
  }
}
