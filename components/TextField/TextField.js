Component.TextField = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'TextField';

    this.parts = {
      input   : document.createElement('input'),
      label   : document.createElement('label'),
      options : Component('Options'),
    };

    this.props = {
      inputBuffer     : 0,
      key             : '',
      filterOptions   : true,
      filteredOptions : [],
      label           : '',
      length          : 0,
      max             : 0,
      min             : 0,
      options         : [{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'},{text: 'hi', value: 'hello'}, {text: 'dog', value: 'god'}, {text: 'big', value: 'small'}],
      optionsConfig   : { text: 'text', value: 'value' },
      optionsRequest  : this.returnOptions,
      placeholder     : '',
      selectedOption  : null,
      sortOptions     : false,
      type            : 'text',
      value           : '',
    };

    this.propTypes = {
      inputBuffer     : 'number',
      key             : 'string',
      filterOptions   : 'boolean',
      filteredOptions : 'array',
      label           : 'string',
      length          : 'number',
      max             : 'number',
      min             : 'number',
      options         : 'array',
      optionsConfig   : 'object',
      placeholder     : 'string',
      showPreview     : 'boolean',
      type            : ['autocomplete', 'password', 'text']
    };

    this.toggles = {
      disabled : false,
      empty    : true,
      focused  : false,
    }

    this.invoke(essence);
  }

  createEvents() {
    let parts = this.parts;

    this.on('mousedown', e => {
      e.stopPropagation();
    });

    this.on('blur', e => {
      this.setToggle('focused', false);
      this.setState('value', parts.input.value);
    }, parts.input);

    this.on('focus', e => {
      this.setToggle('focused', true);
    }, parts.input);

    this.on('input', this.onInput(), parts.input);
  }

  onInput() {
    let timeout = null;
    let parts = this.parts;
    let states = this.states;

    return (e) => {
      let value = parts.input.value;
      clearTimeout(timeout);

      this.setStates({length: value.length, filteredOptions: []});

      if (states.inputBuffer >= 0) {
        timeout = setTimeout(() => {
          if (this.toggles.focused) {
            this.setState('value', value);
          }
        }, states.inputBuffer);
      }
    }
  }

  processSignal(signal, value, origin) {
    let parts = this.parts;
    let states = this.states;

    switch (signal) {
      case 'OFFCLICK':
        this.setState('filteredOptions', []);
        break;
      case 'OPTION_SELECTED':
        let inputText = typeof value === 'object' ? value[states.optionsConfig.text] : value.toString();
        parts.input.value = inputText;
        states.value = inputText;
        this.setStates({ selectedOption: value });
        return 'STOP';
      default:
    }
  }

  render() {
    this.add(this.parts.input);
  }

  renderFilteredOptions(filteredOptions) {
    let parts = this.parts;
    let states = this.states;

    if (filteredOptions.length) {
      parts.options.setStates({ options: filteredOptions });
      this.add(parts.options);
      this.signalParent('REGISTER_OFFCLICK', true);
    } else {
      this.remove(parts.options);
      this.signalParent('REGISTER_OFFCLICK', false);
    }

    return filteredOptions;
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

  renderLength(textLength) {
    this.setToggle('empty', !(textLength || this.states.placeholder));
     return textLength;
  }

  renderMax(max) {
    this.setAttribute('maxlength', max, this.parts.input);
    return max;
  }

  renderOptions(options) {
    let parts = this.parts;
    let states = this.states;
    let filteredOptions = [];
    let inputText = parts.input.value;

    if (inputText !== '') {
      if (states.filterOptions) {
        filteredOptions = options.filter((option) => {
          let optionText = typeof option === 'object' ? option[states.optionsConfig.text] : option.toString();
          return (optionText.indexOf(inputText) > -1);
        });
      } else {
        filteredOptions = options;
      }
    }
    this.setState('filteredOptions', filteredOptions);

    return options;
  }

  renderOptionsConfig(optionsConfig = this.props.optionsConfig) {
    this.parts.options.setState('optionsConfig', optionsConfig);
    this.renderOptions(this.state ? this.state.options : this.props.options);

    return optionsConfig;
  }

  renderPlaceholder(placeholder) {
    this.setAttribute('placeholder', placeholder, this.parts.input);
    this.setToggle('empty', placeholder ? false : true);

    return placeholder;
  }

  renderSelectedOption(selectedOption) {
    if (this.wasInvoked) {
      let states = this.states;
      let optionValue = typeof selectedOption === 'object' ? selectedOption[states.optionsConfig.value] : selectedOption.toString();
      let signalValue = states.key ? { [states.key]: optionValue } : optionValue;

      this.signalParent('VALUE_CHANGED', signalValue);

      return selectedOption;
    }
  }

  renderType(type) {
    this.setAttribute('type', type, this.parts.input);
    return type;
  }

  renderValue(value) {
    let parts = this.parts;
    let states = this.states;

    if (states.type.toLowerCase() === 'autocomplete') {
      states.optionsRequest(this, value);
    } else {
      let signalValue = states.key ? { [states.key]: value } : value;
      this.signalParent('VALUE_CHANGED', signalValue);
    }

    this.parts.input.value = value;
    this.setState('length', value.length);

    return value;
  }

  returnOptions(origin) {
    console.log(origin)
    origin.renderOptions(origin.states.options);
  }
};