Component.RadioButton = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Radio';

    this.invoke(essence);
  }
};