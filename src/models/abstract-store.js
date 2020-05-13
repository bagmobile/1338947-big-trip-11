export default class AbstractStore {

  constructor() {
    if (new.target === AbstractStore) {
      throw new Error(`Can't instantiate AbstractStore, only concrete one.`);
    }

    this._errors = [];
  }

  setErrors(error) {
    this._errors.push(error);
  }

  hasErrors() {
    return this._errors.length > 0;
  }

}
