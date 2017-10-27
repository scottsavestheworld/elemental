Component.Image = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Image';
    this.element = document.createElement('img');
    this.isBasic = true;

    this.props = {
      source: ''
    };

    this.propTypes = {
      source: 'string'
    };

    this.invoke(essence);
  }

  source(value) {
    this.setState('source', value);
    return this;
  }

  renderSource(newValue, oldValue) {
    this.element.src = newValue;
  }

  renderState(stateName, newValue, oldValue) {
    switch (stateName) {
      case 'source':
        this.renderSource(newValue, oldValue);
        break;
      default:
    }
  }
};