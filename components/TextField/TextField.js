Component.TextField = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'TextField';

    this.parts = {
      input    : document.createElement('input'),
      label    : document.createElement('label'),
      rendered : document.createElement('div'),
    };

    this.props = {
      inputBuffer    : -1,
      key            : '',
      label          : '',
      length         : 0,
      markdownParser : function(text) { return text + ' PARSED!'; },
      parseHTML      : true,
      parseMarkdown  : false,
      placeholder    : '',
      showPreview    : false,
      value          : ''
    };

    this.propTypes = {
      inputBuffer    : 'number',
      key            : 'string',
      label          : 'string',
      length         : 'number',
      markdownParser : 'function',
      parseHTML      : 'boolean',
      parseMarkdown  : 'boolean',
      placeholder    : 'string',
      showPreview    : 'boolean',
      value          : 'string'
    };

    this.toggles = {
      empty   : true,
      focused : false,
    }

    this.invoke(essence);
  }

  createEvents() {
    let parts = this.parts;

    this.on('mousedown', e => {
      this.parts.input.focus();
      e.preventDefault();
    });

    this.on('mousedown', e => { 
      e.stopPropagation(); 
    }, parts.input);

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

    return (e) => {
      let value = parts.input.value;
      clearTimeout(timeout);

      if (this.states.inputBuffer >= 0) {
        timeout = setTimeout(() => {
          if (this.toggles.focused) {
            this.setState('value', value);
          }
        }, this.states.inputBuffer);
      }
      this.setState('length', value.length);
    }
  }

  onStateChange(stateName, newValue) {
    this.render();
  }

  processSignal(signal, value, origin) {
    switch (signal) {
      case 'PREVIEW_CHANGED':
        this.setState('showPreview', value);
        break;
      case 'PARSE_HTML':
        this.setState('parseHTML', value);
        break;
      default:
    }
  }

  render() {
    let parts = this.parts;
    let states = this.states;
    let parseHTML = states.parseHTML;
    let finalText =
      (states.parseMarkdown
        ? states.markdownParser(states.value)
        : states.value) || states.value;

    parts.rendered[
      'inner' + (parseHTML ? 'HTML' : 'Text')
    ] = parts.input.value = finalText;
    this.setState('length', parts.input.value.length);
  }

  renderLabel(label) {
    this.parts.label.innerText = label;
    return label;
  }

  renderLength(textLength) {
    this.setToggle('empty', !(textLength || this.states.placeholder));
    return textLength;
  }

  renderPlaceholder(placeholder) {
    this.setAttribute('placeholder', placeholder, this.parts.input);
    this.setToggle('empty', placeholder ? false : true);
    return placeholder;
  }

  renderShowPreview(showPreview) {
    let parts = this.parts;
    this.removeAllChildren();

    if (!showPreview) {
      this.add(parts.label).add(parts.input);
    } else {
      this.add(parts.rendered);
    }
    return showPreview;
  }

  renderValue(value) {
    let key = this.getState('key');
    let signalValue = this.states.key ? { [key]: value } : value;
    this.signalParent('VALUE_CHANGED', signalValue);
    this.render();

    return value;
  }

  togglePreview(isToShowPreview = !this.states.showPreview) {
    this.setState('showPreview', isToShowPreview);
  }

  toggleHTML(isToParseHTML = !this.states.parseHTML) {
    this.setState('parseHTML', isToParseHTML);
  }

  toggleMarkdown(isToParseMarkdown = !this.states.parseMarkdown) {
    this.setState('parseMarkdown', isToParseMarkdown);
  }
};