Module.Header = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Header';

    this.parts = {
      menu: new Module.Menu(),
      search: new Component('Search'),
    }

    this.invoke(essence);
  }

  render() {
    let parts = this.parts;
    this.add(parts.menu)
      .add(parts.search);
  }
}