Component.Checkbox = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Checkbox';

    this.parts = {
      checkbox: document.createElement('div'),
      label: document.createElement('label'),
    }

    this.props = {
      key: '',
      label: '',
      layout: ['checkbox', 'label'],
      value: false,
    }

    this.toggles = {
      checked: false,
    }

    this.invoke(essence);
  }

  createEvents() {
    this.on('click', () => {
      this.setState('value', !this.states.value);
    });
  }

  render() {
    this.parts.checkbox.type = 'checkbox';
    this.setAttribute('tabindex', '0');
  }

  renderValue(value) {
    let key = this.getState('key');
    let signalValue = this.states.key ? { [key]: value } : value;
    this.setToggle('checked', value);
    this.signalParent('VALUE_CHANGED', signalValue);
  }

  renderLabel(label) {
    this.parts.label.innerText = label;
  }

  renderLayout(newLayout, oldLayout) {
    $E.renderLayout(this, newLayout, oldLayout);
  }
};