Component.Options = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Options';

    this.props = {
      options: [],
      optionsConfig: { text: 'text', value: 'value' },
      value: null,
    };

    this.invoke(essence);
  }

  renderOptions(options) {
    let parts = this.parts;
    let optionsConfig = this.state ? this.state.optionsConfig : this.props.optionsConfig;

    this.removeAllChildren();

    for (let option of options) {
      let optionElement = document.createElement('option');
      optionElement.innerText = typeof option === 'object' ? option[optionsConfig.text] : option;
      optionElement.tabIndex = 0;
      this.on('mousedown', e => {
        this.setState('value', option);
        this.signalParent('OPTION_SELECTED', option);
      }, optionElement);

      this.add(optionElement);
    }
  }
};
