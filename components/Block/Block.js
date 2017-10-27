Component.Block = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Block';

    this.invoke(essence);
  }
};