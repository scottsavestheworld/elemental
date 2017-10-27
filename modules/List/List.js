Module.List = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'List';

    this.invoke(essence);
  }
  processSignal(signal, origin) {
  }
}