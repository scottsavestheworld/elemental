Component.Audio = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Audio';

    this.invoke(essence);
  }
};