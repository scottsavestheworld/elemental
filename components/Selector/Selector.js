Component.Selector = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Selector';

    this.parts = {    
      label   : $E('label'),
      select  : $E('span', { tabindex: 0 }),
      options : Component('Options'),
    };

    this.props = {
      key            : '',
      label          : '',
      options        : [],
      optionsConfig  : { text: 'text', value: 'value' },
      placeholder    : '',
      sortOptions    : false,
      value          : null,
    };

    this.propTypes = {
      key            : 'string',
      label          : 'string',
      options        : 'array',
      optionsConfig  : 'object',
      placeholder    : 'string',
      sortOptions    : 'boolean',
    };
  
    this.toggles = {
      focused  : false,
      disabled : false,
    }

    this.invoke(essence);
  }

  createEvents() {
    let parts = this.parts;

    this.on('click', (e) => {
      e.stopPropagation();
      let isFocused = !this.toggles.focused;
      this.toggleOptions(isFocused);
    }, this.parts.select);
    return this;
  }

  processSignal(signal, value, origin) {
    let parts = this.parts;
    let states = this.states;

    switch (signal) {
      case 'OFFCLICK':
        this.toggleOptions(false);
        break;
      case 'OPTION_SELECTED':
        this.setState('value', value);
        return 'STOP';
      default:
    }
  }

  render() {
    const parts = this.parts;
    this.add(parts.select, 1);

    return this;
  }

  renderLabel(label) {
    let parts = this.parts;
    parts.label.innerText = label;

    if (!label) {
      this.remove(parts.label);
    } else {
      this.add(parts.label, 0);
    }

    return label;
  }

  renderOptions(options) {
    let parts = this.parts;
    let select = parts.select;
    let optionsConfig = this.state ? this.state.optionsConfig : this.props.optionsConfig;

    if (options.length) {
      parts.options.setState('options', options);
      this.add(parts.options, 2);
    } else {
      this.remove(parts.options);
    }

    return options;
  }

  renderOptionsConfig(optionsConfig = this.props.optionsConfig) {
    this.parts.options.setState('optionsConfig', optionsConfig);

    return optionsConfig;
  }

  renderValue(value) {
    let parts = this.parts;
    let states = this.states;
    let selectText = typeof value === 'object' ? value[states.optionsConfig.text] : value.toString();
    let signalValue = states.key ? { [states.key]: value } : value;
  
    parts.select.innerText = selectText;

    this.signalParent('VALUE_CHANGED', signalValue);
  }

  returnOptions(origin) {
    origin.renderOptions(origin.states.options);
  }

  toggleOptions(isFocused = !this.toggles.focused) {
    this.signalParent('REGISTER_OFFCLICK', isFocused);
    this.setToggle('focused', isFocused);
  }
};