Component.Video = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Video';

    this.invoke(essence);
  }
};
