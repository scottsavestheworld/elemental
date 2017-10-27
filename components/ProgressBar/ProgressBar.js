Component.ProgressBar = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Progress';

    this.invoke(essence);
  }
};