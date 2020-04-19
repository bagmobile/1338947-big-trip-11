import {createElement} from "../dom-util.js";

const createPhotoItemTemplate = (photo) => {
  const {src} = photo;

  return (`<img class="event__photo" src="${src}" alt="Event photo">`);
};

const createEventDestinationTemplate = (destination) => {
  const {description, photos} = destination;
  const photoList = photos.map((photo) => createPhotoItemTemplate(photo)).join(`\n`);

  return (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
        ${description}
    </p>
    <div class="event__photos-container">
        <div class="event__photos-tape">
            ${photoList}
        </div>
    </div>
</section>
`);
};

export class EventDestination {

  constructor(destination) {
    this._destination = destination;
    this._element = null;
  }

  getTemplate() {
    return createEventDestinationTemplate(this._destination);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

