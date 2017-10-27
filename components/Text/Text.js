Component.Text = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Text';
    this.isBasic = true;

    this.props = {
      value: ''
    };

    this.propTypes = {
      value: 'string'
    };

    this.invoke(essence);
  }

  text(value) {
    this.setState('value', value);
    return this;
  }

  renderValue(newValue, oldValue) {
    this.element.innerText = newValue;
  }
};